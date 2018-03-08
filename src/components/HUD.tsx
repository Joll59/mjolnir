import * as React from 'react';

import { percentage25, percentage50, percentage80 } from '../helpers';
import { Item, PlayerState, Room } from '../types';
import { createInventory } from './';
import { Container } from 'semantic-ui-react';

interface RoomProps {
    playerPickUpItem: (Item: Item) => {};
    currentRoom: Room | undefined;
}

export class RoomComponent extends React.Component<RoomProps> {

    render() {
        const { currentRoom } = this.props;
        const roomInv = () => createInventory(currentRoom, this.props.playerPickUpItem, 'add to player inventory');
        let divStyle = { };
        currentRoom ? divStyle = {
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: currentRoom!.description,
            margin: 5,
        } : null 
        

        return (
            <div style={divStyle} className={'treasureChest'}>
            <Container textAlign="justified">
                { currentRoom ?  roomInv() : null }
            </Container>
            </div>
        );
    }
}


interface PlayerProps {
    player: PlayerState;
    dropItem: (Item: Item) => {};
}


export class PlayerComponent extends React.Component<PlayerProps>{

    render() {
        let divStyle = {
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: 'tomato',
            margin: 5,
        } 
        const { player } = this.props;
        const healthBar = (
            <meter
                className={player.health <= percentage25(player.initialHealth) ? 'flash' : ''}
                value={player.health}
                min={0}
                low={percentage25(player.initialHealth)}
                optimum={percentage80(player.initialHealth)}
                high={percentage50(player.initialHealth)}
                max={player.initialHealth}
            />
        );

        const playerInv = () => createInventory(player, this.props.dropItem, 'drop item');
       
        return (
            <Container className={'playerInventory'} style={divStyle}>
                <div className={'healthBar'} hidden={true}>{healthBar} </div>
                {playerInv()}
            </Container>
        )
    }
} 