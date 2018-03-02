import * as React from 'react';

import { percentage25, percentage50, percentage80 } from '../helpers/random';
import { Entity, Item, PlayerState, Room } from '../types';
import { DefaultButton, IconButton } from  'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';

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
    
    showPlayerInventory = () => {
        this.setState({viewPlayerInv: !this.state.viewPlayerInv});
    }

    showRoomTreasures = () => {
        this.setState({viewRoomInv: !this.state.viewRoomInv});
    }

    createInventory: any = (
        entity: Entity, 
        hideInvMethod: () => {}, 
        itemClickMethod: (Item: Item) => {}, 
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
            <Icon 
                className={'redText larger'} 
                iconName={'Cancel'} 
                onClick={hideInvMethod}
            />
        </section>
    )

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
        const showPlayerInvBtn = (<IconButton iconProps={{iconName: 'Save'}} onClick={this.showPlayerInventory}/>);

        const showRoomInvBtn = (<IconButton iconProps={{iconName: 'Archive'}} onClick={this.showRoomTreasures}/>);

        return (
            <div>
                <div className="upperLeft" hidden={false}> {healthBar} </div>
                <div className="lowerRight"> 
                {
                    this.state.viewPlayerInv ? 
                        this.createInventory(
                            player, 
                            this.showPlayerInventory, 
                            this.props.dropItem, 
                            'drop item') : showPlayerInvBtn
                }
                </div>
                <div>
                { 
                    currentRoom && this.state.viewRoomInv ? 
                        this.createInventory(
                        currentRoom,
                        this.showRoomTreasures, 
                        this.props.pickUpItem, 
                        'add to inventory') : showRoomInvBtn 
                }
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
        const itemInteractButton = (
            <DefaultButton 
                onClick={this.handleItemInteraction} 
                iconProps={{iconName: 'MiniExpand'}} 
                title={this.props.buttonValue} 
                ariaLabel={this.props.buttonValue}
            />);

        const item = (<p className={'center'}> {this.props.item.name}</p>);

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