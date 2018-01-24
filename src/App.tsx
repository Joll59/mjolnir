import * as React from 'react';
import './App.css';
import Object from './components/object';
import { handleUserInput } from './actions/index';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { StoreState } from './interfaces/index';
import Chat from './components/mockChat';
import { MouseEvent, SyntheticEvent } from 'react';

export interface DispatchProps {
  handleUserInput: (e: SyntheticEvent<Element>) => {};
}

class App extends React.Component<StoreState & DispatchProps, StoreState> {
  constructor (props: StoreState & DispatchProps) {
    super(props);
  }
 public render(): JSX.Element {
    return (
      <div>
        <h2 className="App-header">Mjolnir</h2>
        <div className="gui">
          <Object
            description={this.props.description}
            clicked={(e: MouseEvent<HTMLButtonElement>) => this.props.handleUserInput(e)} 
          />
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
