import './App.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { handleUserInput } from './actions/user';
import { setPlayerLocation, pickUpItem, dropItem } from './actions/player';
import { StoreState, Item, Direction } from './types/index';
import { Chat, HeadsUpDisplay as HUD, TestButton } from './components';
import { GameMap } from './components/GameMap';

interface DispatchProps {
  handleUserInput: (e: React.SyntheticEvent<Element>) => {};
  pickUpItem: (Item: Item) => {};
  dropItem: (Item: Item) => {};
  setPlayerLocation: (location: [number, number]) => {};
}

interface DirectionProps {
  exitDirection: string;
  exitClick: (direction: string) => void;
}

class Exit extends React.Component<DirectionProps, {}> {

  render() {
    return (
      <button onClick={() => this.props.exitClick(this.props.exitDirection)}>
        Exit to the {this.props.exitDirection}
      </button>);
  }

}

type Props = StoreState & DispatchProps;

class App extends React.Component<Props, StoreState> {

    componentDidMount() {
      this.props.setPlayerLocation(this.props.gameMap!.mapPath.startingRoom());
    }
 
    handleExitClick = (direction: Direction) => {
      let { location } = this.props.player!;
      let nextRoom = this.props.gameMap!.mapPath.roomToFromDirection(location, direction);
      this.props.setPlayerLocation(nextRoom);
    }
    
  public render(): JSX.Element {
    let { handleUserInput, pickUpItem, dropItem, player, message, gameMap } = this.props;
    
    let methods = {
      pickUpItem, dropItem
    };

    return (
      <div>
        <h2 className="App-header">Mjolnir</h2>
        <TestButton
            clicked={(e: React.MouseEvent<HTMLButtonElement>) => handleUserInput(e)} 
        />
        <div className="gui">
        <HUD player={player!} methods={methods} />
        <GameMap grid={gameMap!.grid} mapPath={gameMap!.mapPath}/>
        <p> Current Room: x:{player!.location[0]} y: {player!.location[1]} </p>
        {gameMap!.mapPath.possibleExits(player!.location).map(
          (door, index) => <Exit key={index} exitDirection={door} exitClick={this.handleExitClick}/>)}
        <Chat 
          messageList={message.messageList} 
          handleUserInput={(e: React.SyntheticEvent<Element>) => handleUserInput(e)}
        />
        </div>
      </div>
    );
  }
}

const actionCreator = {
  handleUserInput,
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
    { ...state.message,
      messageList: state.message.messageList 
    },
    player: state.player,
    gameMap: state.gameMap
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App as any);
