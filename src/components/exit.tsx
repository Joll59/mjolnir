
import * as React from 'react';
// import { DefaultButton } from  'office-ui-fabric-react/lib/Button';
import { Button, Icon } from 'semantic-ui-react';
import { Direction } from '../types';

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
      let content = generateButtonIcon(this.props.exitDirection as Direction);
      return (
        <Button
          size={'mini'}
          compact={true}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.props.exitClick(e)}
          className={`${this.props.exitDirection}`}
          name={`Exit ${this.props.exitDirection}`}
          icon={content}
        /> 
      );
    }
  }

  const generateButtonIcon = (e: Direction) => {
    switch (e) {
      case 'S':
        return <Icon name="caret down"/>
      case 'N':
        return <Icon name="caret up"/>
      case 'E':
        return <Icon name="caret right"/>
      case 'W':
        return <Icon name="caret left"/>  
      default:
        return;
    }
  } 