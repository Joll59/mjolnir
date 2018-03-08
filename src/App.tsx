import './App.css';

import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import 'isomorphic-fetch';
import { initializeIcons } from '@uifabric/icons';
// import * as Rx from 'rxjs';

import { removeItem, addItem, setPlayerLocation } from './actions/player';
import { handleUserChatInput } from './actions/user';
import { Chat, Gamemap, RoomComponent, PlayerComponent, Exit } from './components';
import { arrayEquals } from './helpers';
import { Direction, Item, Room, StoreState, userEvent } from './types';

initializeIcons();

interface DispatchProps {
  handleUserChatInput: (e: userEvent) => {};
  addItem: (Item: Item, room: Room | undefined) => {};
  removeItem: (Item: Item, room: Room | undefined) => {};
  setPlayerLocation: (location: [number, number]) => {};
}

type Props = StoreState & DispatchProps;

/** 
 * top level component.
 */
class App extends React.Component<Props, StoreState> {

  componentDidMount() {
    this.props.setPlayerLocation(this.props.gameMap!.map.startingRoom());
  }


  parseInput = (e: userEvent) => {
    let text = e.currentTarget!.value || e.currentTarget.name || e.currentTarget.innerText;
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
      // console.log(currentItemTest[1].trim());
    }
  }

  handleInput = (
    e: userEvent
  ) => {
    this.parseInput(e);
    this.props.handleUserChatInput(e);
  }
  
  getCurrentRoom = () => {
    return this.props.gameMap.rooms.find
    (room => arrayEquals(room.location, this.props.player.location));
  }

  givePlayerItem = (item: Item) => {
    let currentRoom = this.getCurrentRoom();
    return this.props.addItem(item, currentRoom);
  }

  giveRoomItem = (item: Item) => {
    let currentRoom = this.getCurrentRoom();
   return this.props.removeItem(item, currentRoom)   
  }

  public render(): JSX.Element {
    let { player, message, gameMap } = this.props;
    let currentRoom = this.getCurrentRoom();

    // <h2 className="center">Mjolnir</h2>
    return (
      // <div id="bg">
      //   <img src='https://dummyimage.com/1280x720/ffffff/0011ff.png&text=Mjolnir' alt=""/>
      // </div>
      <div className={'parent'}>

          <PlayerComponent
            player={player!}
            dropItem={this.giveRoomItem}
          />

          <RoomComponent
            playerPickUpItem={this.givePlayerItem}
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
        <div id={'compass'}>
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
