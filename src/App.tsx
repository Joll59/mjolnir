import * as React from 'react';
import './App.css';
import Chat from './components/chat';
import HeadsUpDisplay from './components/HUD';
import { handleUserInput } from './actions/index';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { StoreState } from './interfaces/index';
import { /*MouseEvent,*/ SyntheticEvent } from 'react';
// import GameObject from './components/gameObject';
import Player from './models/player';

export interface DispatchProps {
  handleUserInput: (e: SyntheticEvent<Element>) => {};
}
type Props = StoreState & DispatchProps;
class App extends React.Component<Props, StoreState> {
  constructor (props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    
    const testPlayer: Player = new Player( undefined, undefined, 100);
    // testPlayer.health -= 95;
    return (
      <div>
        {/*<h2 className="App-header">Mjolnir</h2> */}
        <div className="gui">
        <HeadsUpDisplay player={testPlayer}/>
          {/*<GameObject
            description={this.props.description}
            clicked={(e: MouseEvent<HTMLButtonElement>) => this.props.handleUserInput(e)} 
    /> */}
          <Chat 
            messageList={this.props.messageList} 
            handleUserInput={(e: SyntheticEvent<Element>) => this.props.handleUserInput(e)}
          />
        </div>
      </div>
    );
  }
}

const actionCreator = {
  handleUserInput
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(actionCreator, dispatch);
};

const mapStateToProps = (state: StoreState) => {
  return { description: state.description, messageList: state.messageList };
};

export default connect(mapStateToProps, mapDispatchToProps)(App as any);
