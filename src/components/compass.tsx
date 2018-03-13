
import * as React from 'react';
// import { DefaultButton } from  'office-ui-fabric-react/lib/Button';
import { Button, Icon } from 'semantic-ui-react';
import { Direction } from '../types';

interface DirectionProps {
    exitDirection: string;
    go: (direction: Direction) => void;
  }
  /**
   * Exit component representing the passing from one room to another. 
   * It provides button for player move action from one room to another.
   */
export class Compass extends React.Component<DirectionProps, {}> {

  handleClick = () => {
    this.props.go(this.props.exitDirection as Direction);
  }

  generateButtonIcon = (e: Direction) => {
    switch (e) {
      case 'S':
        return <Icon name="caret down"/>;
      case 'N':
        return <Icon name="caret up"/>;
      case 'E':
        return <Icon name="caret right"/>;
      case 'W':
        return <Icon name="caret left"/>;  
      default:
        return;
    }
  } 
    render() {
      let content = this.generateButtonIcon(this.props.exitDirection as Direction);
      return (
        <Button
          size={'mini'}
          compact={true}
          onClick={this.handleClick}
          className={`${this.props.exitDirection}`}
          name={`Exit ${this.props.exitDirection}`}
          icon={content}
        /> 
      );
    }
  }