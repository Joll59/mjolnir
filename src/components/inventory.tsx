import * as React from 'react';
import { Item, Entity } from '../types';
import { Popup, List, Label } from 'semantic-ui-react';

interface ItemProps {
    item: Item;
    InteractWithItem: (Item: Item) => void;
    popupValue: string;
    index: number;
    unique: boolean;
}

export class InventoryItem extends React.Component<ItemProps> {

    handleItemInteraction = () => {
        this.props.InteractWithItem(this.props.item);
    }
    render() {
        const pStyle = {
            color: this.props.item.description
        }
        const item = (<p style={pStyle}>{this.props.item.name}</p>);
        return (
            <List.Item
                onClick={this.handleItemInteraction}
                className={'inventoryItem'}
                alt={this.props.popupValue}
            >{!this.props.unique ? <Label horizontal={true}>{this.props.index}</Label> : <div />}
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
    itemClickMethod: (Item: Item) => void,
    popupValue: string,
    uniqueness: boolean = true
) => (
        <List
            divided={true}
            selection={true}
            celled={true}
        >
            {
                entity.inventory!.map((x, index) =>
                    (<InventoryItem
                        key={x.id + x.type}
                        item={x}
                        index={index}
                        InteractWithItem={itemClickMethod}
                        popupValue={popupValue}
                        unique={uniqueness}
                    />)
                )
            }
        </List>
    );