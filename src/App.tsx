import './App.css';

import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
// import * as Rx from 'rxjs';

import { removeItem, addItem, setPlayerLocation } from './actions/player';
import { handleUserChatInput } from './actions/user';
import { Chat, Gamemap, HeadsUpDisplay as HUD } from './components';
import { arrayEquals } from './helpers/random';
import { Direction, Item, Room, StoreState } from './types';
import { DefaultButton } from  'office-ui-fabric-react/lib/Button';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();
interface DispatchProps {
  handleUserChatInput: (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {};
  addItem: (Item: Item, room: Room | undefined) => {};
  removeItem: (Item: Item) => {};
  setPlayerLocation: (location: [number, number]) => {};
}

interface DirectionProps {
  exitDirection: string;
  exitClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Exit component representing the passing from one room to another. 
 * It provides button for player move action from one room to another.
 */
class Exit extends React.Component<DirectionProps, {}> {
  render() {
    return (
      <DefaultButton
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.props.exitClick(e)}
        className={`exit ${this.props.exitDirection}`}
        // iconProps={{iconName: `CompassN${this.props.exitDirection}`}}
      >
      Exit to {this.props.exitDirection}
    </DefaultButton>);
  }
}

type Props = StoreState & DispatchProps;

/** 
 * top level component.
*/
class App extends React.Component<Props, StoreState> {

  componentDidMount() {
    this.props.setPlayerLocation(this.props.gameMap!.map.startingRoom());
  }

  handleInput = (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    let text = e.currentTarget.value || e.currentTarget.innerText;
    // process what was entered by user and decide what to do. 
    let currentExitTest = /Exit(.*)/i.exec(text);
    if (currentExitTest) {
      let result = currentExitTest[1].trim().toLowerCase().split(' ');
      let direction = result[result.length - 1][0].toUpperCase() as Direction;
      let { location } = this.props.player!;
      if (this.props.gameMap!.map.isDoorway(location, direction)) {
        let nextRoom = this.props.gameMap!.map.roomToFromDirection(location, direction);
        this.props.setPlayerLocation(nextRoom);
      }
    }
    let currentItemTest = /Pick Up(.*)/i.exec(text);
    if (currentItemTest) {
      console.log(currentItemTest[1].trim());
    }
    this.props.handleUserChatInput(e);
  }

  givePlayerItem = (item: Item) => {
    //now i can have player location hard wired in ..... by modifying the removeItem method here. 
    let currentRoom: Room | undefined = this.props.gameMap.rooms.find(room => arrayEquals(room.location, this.props.player.location));
    return this.props.addItem(item, currentRoom);
  }
  // currentObservableRoom = Rx.Observable.of(this.props.player!.location);

  public render(): JSX.Element {
    let { removeItem, player, message, gameMap } = this.props;
    let currentRoom: Room | undefined = gameMap.rooms.find(room => arrayEquals(room.location, player.location));

    return (
      <div>
        <h2 className="center">Mjolnir</h2>
        <div>
        <div>
          <HUD
            player={player!}
            dropItem={removeItem}
            pickUpItem={this.givePlayerItem}
            currentRoom={currentRoom}
          />

          <Gamemap
            grid={gameMap!.grid}
            mapPath={gameMap!.map}
            playerLocation={player!.location}
          />

          <Chat
            messageList={message.messageList}
            handleUserChatInput={(e: React.KeyboardEvent<HTMLInputElement>) => this.handleInput(e)}
          />

        </div>
          {gameMap!.map.possibleExits(player!.location).map(
            (
              door,
              index) =>
              <Exit
                key={index}
                exitDirection={door}
                exitClick={this.handleInput}
              />
          )
          }
        </div>
      </div>
    );
  }
}

const actionCreator = {
  handleUserChatInput,
  setPlayerLocation,
  addItem,
  removeItem
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(actionCreator, dispatch);
};

const mapStateToProps = (state: StoreState) => {
  return {
    message:
      {
        ...state.message,
        messageList: state.message.messageList
      },
    player: state.player,
    gameMap: state.gameMap
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App as any);
