import './App.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { handleUserInput } from './actions/index';
import { StoreState } from './types/index';
import { Chat, HeadsUpDisplay as HUD, TestButton } from './components';
import Player from './models/player';

export interface DispatchProps {
  handleUserInput: (e: React.SyntheticEvent<Element>) => {};
}

type Props = StoreState & DispatchProps;

class App extends React.Component<Props, StoreState> {

  constructor (props: Props) {
    super(props);
    this.state = {
      message: this.props.message,
      player: new Player(new Date().toLocaleString())
    };
  }

 handleHealth = (e: React.SyntheticEvent<Element>) => {
   // tslint:disable-next-line:max-line-length
   let currentHealth = this.state.player!.health > 25 ? this.state.player!.health -= 25 : this.state.player!.health += 75;
   
   this.setState(
    { player: 
      Object.assign(this.state.player, {health: currentHealth}) });
 }
  public render(): JSX.Element {
  
    return (
      <div>
        <h2 className="App-header">Mjolnir</h2>
        <div className="gui">
        <HUD player={this.state.player!}/>
        {console.log(this.state.player!.health)}
        <p> {this.props.message.description} </p>
          <TestButton
            clicked={(e: React.MouseEvent<HTMLButtonElement>) => this.handleHealth(e)} 
          />          
        <Chat 
            messageList={this.props.message.messageList} 
            handleUserInput={(e: React.SyntheticEvent<Element>) => this.props.handleUserInput(e)}
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
  return {
    message:
    { ...state.message,
      messageList: state.message.messageList }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App as any);
