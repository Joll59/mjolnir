import * as React from 'react';

import { percentage25, percentage50, percentage80 } from '../helpers/random';
import { Entity, Item, PlayerState, Room } from '../types';
import { DefaultButton } from  'office-ui-fabric-react/lib/Button';

interface PassedProps {
    player: PlayerState;
    dropItem: (Item: Item) => {};
    pickUpItem: (Item: Item) => {};
    currentRoom: Room | undefined;
}

export class HeadsUpDisplay extends React.Component<PassedProps, { viewPlayerInv: boolean, viewRoomInv: boolean}> {

    constructor (props: PassedProps) {
        super (props);
        this.state = {
            viewPlayerInv: false,
            viewRoomInv: false
        };
    }
    
    viewPlayerInventory = () => {
        this.setState({viewPlayerInv: !this.state.viewPlayerInv});
    }

    viewRoomInventory = () => {
        this.setState({viewRoomInv: !this.state.viewRoomInv});
    }

    createInventory: any = (
        entity: Entity, 
        hideInvMethod: ()=> {}, 
        itemClickMethod: (Item: Item)=>{}, 
        buttonValue: string
    ) => (
        <section>
            <ul className="wrapper">
                {
                    entity.inventory!.map(x =>
                        (<Inventory
                            key={x.id + x.type}
                            item={x}
                            InteractWithItem={itemClickMethod}
                            buttonValue={buttonValue}
                        />)
                    )
                }
            </ul>
            <DefaultButton onClick={hideInvMethod}> Close </DefaultButton>
        </section>
    );

    render() {
        let { player, currentRoom } = this.props;
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
        const showPlayerInvBtn = (<DefaultButton onClick={this.viewPlayerInventory}>Player Inventory</DefaultButton>);

        const showRoomInvBtn = (<DefaultButton onClick={this.viewRoomInventory}> Treasure Chest </DefaultButton>);

        return (
            <div>
                <div className="center" hidden={true}> {healthBar} </div>
                <div className="lowerRight">{this.state.viewPlayerInv ? this.createInventory(player, this.viewPlayerInventory, this.props.dropItem, 'drop') : showPlayerInvBtn}</div>
                <div>
                {currentRoom && this.state.viewRoomInv ? this.createInventory(currentRoom,this.viewRoomInventory, this.props.pickUpItem, 'add to inventory') : showRoomInvBtn}
                </div>
            </div>
        );
    }
}

interface InventoryProps {
    item: Item; 
    InteractWithItem: (Item: Item) => {};
    buttonValue: string;
}

class Inventory extends React.Component<InventoryProps, {view: boolean}> {
    
    constructor (props: InventoryProps) {
        super (props);
        this.state = {
            view: true
        };
    }
    changeView = () => {
        this.setState({view: !this.state.view});
    }

    handleItemInteraction = () => {
        this.props.InteractWithItem(this.props.item);
    }

    render() {
        const itemInteractButton = (<DefaultButton onClick={this.handleItemInteraction}>{this.props.buttonValue}</DefaultButton>);

        const item = (<p> {this.props.item.name}: {this.props.item.id} </p>);

        return (
            <li 
                onClick={this.changeView} 
                tabIndex={0}
                className="box"
            >
                {this.state.view ? item : itemInteractButton}
            </li>
        );
    }
}