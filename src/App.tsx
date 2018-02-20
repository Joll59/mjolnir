import './App.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { handleUserChatInput } from './actions/user';
import { setPlayerLocation, pickUpItem, dropItem } from './actions/player';
import { StoreState, Item, Direction } from './types/index';
import { Chat, HeadsUpDisplay as HUD, Gamemap } from './components';

interface DispatchProps {
  handleUserChatInput: (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {};
  pickUpItem: (Item: Item) => {};
  dropItem: (Item: Item) => {};
  setPlayerLocation: (location: [number, number]) => {};
}

interface DirectionProps {
  exitDirection: string;
  exitClick: (e: React.SyntheticEvent<Element>) => void;
}

/**
 * Exit component representing the passing from one room to another. 
 * It provides a button to UI for a player move action from one room to another.
 *
 */
class Exit extends React.Component<DirectionProps, {}> {
  render() {
    return (
      <button onClick={(e: React.SyntheticEvent<Element>) => this.props.exitClick(e)}>
        Exit to {this.props.exitDirection}
      </button>);
  }

}

type Props = StoreState & DispatchProps;

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
      let direction = result[result.length - 1][0].toUpperCase() as Direction ;
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

  public render(): JSX.Element {
    let { pickUpItem, dropItem, player, message, gameMap } = this.props;

    let methods = {
      pickUpItem, dropItem
    };

    return (
      <div>
        <h2 className="App-header">Mjolnir</h2>
        <div className="gui">
          <HUD player={player!} methods={methods} />
          <Gamemap grid={gameMap!.grid} mapPath={gameMap!.map} playerLocation={player!.location} />
            {gameMap!.map.possibleExits(player!.location).map(
              (door, index) => <Exit key={index} exitDirection={door} exitClick={this.handleInput} />)}
          <Chat
            messageList={message.messageList}
            handleUserChatInput={(e: React.KeyboardEvent<HTMLInputElement>) => this.handleInput(e)}
          />
        </div>
      </div>
    );
  }
}

const actionCreator = {
  handleUserChatInput,
  setPlayerLocation,
  pickUpItem,
  dropItem
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
