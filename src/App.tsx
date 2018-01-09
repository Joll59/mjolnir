import * as React from 'react';
import './App.css';
import Object from './components/object';
import { clickedOnObject, clickedOnFeature } from './actions/index';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { StoreState } from './types/index';

const logo = require('./logo.svg');

export type DispatchProps = {
  objectClicked: () => {};
  featureClicked: () => {}
};

class App extends React.Component<StoreState & DispatchProps, {}> {
  constructor (props:any) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
         <Object 
          description={this.props.description}      
          feature={() => this.props.featureClicked()} 
          object={() => this.props.objectClicked()} 
         />
      </div>
    );
  }
}

const actionCreator = {
  objectClicked: clickedOnObject,
  featureClicked: clickedOnFeature
};
const mapDispatchToProps = (dispatch: Dispatch<() => void>) => {
  return bindActionCreators(actionCreator, dispatch);
};

const mapStateToProps = (state: StoreState) => {
  return { description: state.description };
};

export default connect(mapStateToProps, mapDispatchToProps)(App as any);
