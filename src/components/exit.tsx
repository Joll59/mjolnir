
import * as React from 'react';
import { DefaultButton } from  'office-ui-fabric-react/lib/Button';

interface DirectionProps {
    exitDirection: string;
    exitClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }
  
  /**
   * Exit component representing the passing from one room to another. 
   * It provides button for player move action from one room to another.
   */
export class Exit extends React.Component<DirectionProps, {}> {
    render() {
      return (
        <DefaultButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.props.exitClick(e)}
          className={`exit ${this.props.exitDirection}`}
        >
        Exit to {this.props.exitDirection}
        </DefaultButton>);
    }
  }