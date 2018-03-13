import { Item, Entity } from '../types';
import * as React from 'react';
import { Popup, List } from 'semantic-ui-react';

interface ItemProps {
    item: Item; 
    InteractWithItem: (Item: Item) => {};
    popupValue: string;
}

export class InventoryItem extends React.Component<ItemProps, { }> {
    
    handleItemInteraction = () => {
        this.props.InteractWithItem(this.props.item);
    }
    render() {
        const item = (<p>{this.props.item.name}</p>);
        return (
            <List.Item
                // textAlign="center" 
                onClick={this.handleItemInteraction}
                className={'inventoryItem'}
                alt={this.props.popupValue}
            >
                <section>
                    <Popup
                        trigger={item}
                        content={this.props.popupValue}
                        basic={true}
                    />
                </section>
            </List.Item>
        );
    }
}

export const createInventory: any = (
    entity: Entity, 
    itemClickMethod: (Item: Item) => {}, 
    popupValue: string
) => (
        <List 
            // stackable={true} 
            // container={true} 
            // centered={true} 
            // columns={3}
            celled={true}
        >
          {
                entity.inventory!.map(x =>
                    (<InventoryItem
                        key={x.id + x.type}
                        item={x}
                        InteractWithItem={itemClickMethod}
                        popupValue={popupValue}
                    />)
                )
            }
        </List>
);