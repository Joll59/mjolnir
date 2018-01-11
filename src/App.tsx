import * as React from 'react';
import './App.css';
import Object from './components/object';
import { clicked } from './actions/index';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { StoreState } from './interfaces/index';
import Chat from './components/mockChat';
import { MouseEvent } from 'react';

export interface DispatchProps {
  clicked: (e: MouseEvent<HTMLButtonElement>) => {};
}

class App extends React.Component<StoreState & DispatchProps, {}> {
  constructor (props: any) {
    super(props);
  }
 public render(): JSX.Element {
    return (
      <div>
        <h2 className="App-header">Mjolnir</h2>
        <div className="gui">
          <Object
            description={this.props.description}
            clicked={(e: MouseEvent<HTMLButtonElement>) => this.props.clicked(e)} 
          />
          <Chat messageList={this.props.messageList}/>
        </div>
      </div>
    );
  }
}

const actionCreator = {
    clicked
};
const mapDispatchToProps = (dispatch: Dispatch<() => void>) => {
  return bindActionCreators(actionCreator, dispatch);
};

const mapStateToProps = (state: StoreState) => {
  return { description: state.description, messageList: state.messageList };
};

export default connect(mapStateToProps, mapDispatchToProps)(App as any);
