import './App.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { handleUserInput } from './actions/user';
import { setPlayerLocation, pickUp, dropItem } from './actions/player';
import { StoreState, Item } from './types/index';
import { Chat, HeadsUpDisplay as HUD, TestButton } from './components';
import { MiniMap } from './components/miniMap';
import { Doorways } from './models/doorways';

const c = {
  GRID_HEIGHT: 5,
  GRID_WIDTH: 5,
  MAX_ROOMS: 10,
};

const mapPath = new Doorways(c.MAX_ROOMS, [c.GRID_WIDTH, c.GRID_HEIGHT]);

const createGrid = () => {
  let grid: Array<Array<[number, number]>> = [];
  for (let i = 0; i < c.GRID_HEIGHT; i++) {
      grid.push([]);
      for (let index = 0; index < c.GRID_WIDTH; index++) {
          grid[i].push([i, index]);
      }
  }
  return grid;
};

interface DispatchProps {
  handleUserInput: (e: React.SyntheticEvent<Element>) => {};
  pickUp: (Item: Item) => {};
  dropItem: (Item: Item) => {};
  setPlayerLocation: (x: number, y: number) => {};
}

type Props = StoreState & DispatchProps;

class App extends React.Component<Props, StoreState> {

  public render(): JSX.Element {
    let { handleUserInput, setPlayerLocation, pickUp, dropItem, player, message } = this.props;
    
    let methods = {
      setPlayerLocation, pickUp, dropItem
    };

    return (
      <div>
        <h2 className="App-header">Mjolnir</h2>
        <TestButton
            clicked={(e: React.MouseEvent<HTMLButtonElement>) => handleUserInput(e)} 
        />
        <div className="gui">
        <HUD player={player!} methods={methods} />
        <MiniMap grid={createGrid()} mapPath={mapPath}/>
        <p> {message.description} </p>
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
  pickUp,
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
    player: state.player
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App as any);
