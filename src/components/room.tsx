import * as React from 'react';
import { Container } from 'semantic-ui-react';
import { Item, Room } from '../types/index';
import { createInventory } from './inventory';

interface RoomProps {
    playerPickUpItem: (Item: Item) => {};
    currentRoom: Room | undefined;
}

export class RoomComponent extends React.Component<RoomProps> {

    render() {
        const { currentRoom } = this.props;
        const roomInv = () => createInventory(currentRoom, this.props.playerPickUpItem, 'add to player inventory');
        let divStyle = currentRoom ? {
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: currentRoom!.description,
            margin: 5,
        } : {}; 
        
        return (
            <div style={divStyle} className={'treasureChest'}>
            <Container textAlign="justified">
                {currentRoom ?  roomInv() : null}
            </Container>
            </div>
        );
    }
}