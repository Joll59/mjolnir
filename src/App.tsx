import './App.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { handleUserInput } from './actions/user';
import { setPlayerLocation, pickUp, dropItem } from './actions/player';
import { StoreState, Item } from './types/index';
import { Chat, HeadsUpDisplay as HUD, TestButton } from './components';

export interface DispatchProps {
  handleUserInput: (e: React.SyntheticEvent<Element>) => {};
  pickUp: (Item: Item) => {};
  dropItem: (Item: Item) => {};
  setPlayerLocation: (x: number, y: number) => {};
}

type Props = StoreState & DispatchProps;

class App extends React.Component<Props, StoreState> {

  public render(): JSX.Element {
    let { handleUserInput, setPlayerLocation,pickUp,dropItem } = this.props;
    
    let methods = {
      setPlayerLocation, pickUp, dropItem
    };

    return (
      <div>
        <h2 className="App-header">Mjolnir</h2>
        <div className="gui">
        <HUD player={this.props.player!} methods={methods} />
        <p> {this.props.message.description} </p>
          <TestButton
            clicked={(e: React.MouseEvent<HTMLButtonElement>) => handleUserInput(e)} 
          />
        <Chat 
            messageList={this.props.message.messageList} 
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
