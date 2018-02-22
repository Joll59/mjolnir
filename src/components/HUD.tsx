import * as React from 'react';
import { percentage25, percentage50, percentage80 } from '../helpers/random';
import { PlayerState, Item, Room } from '../types';


interface PassedProps {
    player: PlayerState;
    dropItem: (Item: Item) => {};
    pickUpItem: (Item: Item) => {};
    currentRoom: Room | undefined;
}

export class HeadsUpDisplay extends React.Component<PassedProps, { isPlayerInventoryVisible: boolean}> {

    constructor (props: PassedProps) {
        super (props);
        this.state = {
            isPlayerInventoryVisible: false
        };
    }
    
    viewPlayerInventory = () => {
        this.setState({isPlayerInventoryVisible: !this.state.isPlayerInventoryVisible});
    }
    componentDidUpdate() {
        console.log(this.props.currentRoom!.description);
        console.log(this.props.currentRoom!.inventory);
    }

    render() {
        let { player } = this.props;
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
        const showInvBtn = (<button onClick={this.viewPlayerInventory}>Inventory</button>);
        const inventory = (
            <ul className="wrapper">
                {
                    player.inventory.map(x =>
                        (<PlayerInventory
                            key={x.id + x.type}
                            item={x}
                            dropItem={this.props.dropItem}
                        />)
                    )
                }
                <button onClick={this.viewPlayerInventory}> Hide </button>
            </ul>
        );
        return (
            <div>
                <div className="center" hidden={true}> {healthBar} </div>
                <div>{this.state.isPlayerInventoryVisible ? inventory : showInvBtn}</div>
                <div>
                {this.props.currentRoom ? this.props.currentRoom!.inventory[0].name : <br/>}
                </div>
            </div>
        );
    }
}

interface inventoryProps {
    item: Item; 
    dropItem: (Item: Item) => {};
}

class PlayerInventory extends React.Component<inventoryProps, {view: boolean}> {
    
    constructor (props: inventoryProps) {
        super (props);
        this.state = {
            view: true
        };
    }
    changeView = () => {
        // e.stopPropagation();
        this.setState({view: !this.state.view});
    }

    handleItemDrop = () => {
        this.props.dropItem(this.props.item);
    }

    render() {
        const dropButton = (<button onClick={this.handleItemDrop}>drop</button>);

        const item = (<p>{this.props.item.name} </p>);

        return (
            <li 
                onClick={this.changeView} 
                tabIndex={0}
                className="box"
            >
                {this.state.view ? item : dropButton}
            </li>
        );
    }
}