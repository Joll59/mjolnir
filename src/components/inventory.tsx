import { Item, Entity } from '../types';
import * as React from 'react';
import { Header, Grid, Popup } from 'semantic-ui-react';

interface ItemProps {
    item: Item; 
    InteractWithItem: (Item: Item) => {};
    buttonValue: string;
}

export class InventoryItem extends React.Component<ItemProps, { }> {
    
    handleItemInteraction = () => {
        this.props.InteractWithItem(this.props.item);
    }
    render() {
        const item = (<p>{this.props.item.name}</p>);
        return (
            <Grid.Column 
                textAlign="center" 
                onClick={this.handleItemInteraction}
                className={"inventoryItem"}
                alt={this.props.buttonValue}
            >
                <Header as="h4">
                    <Popup
                        trigger={item}
                        content={this.props.buttonValue}
                        basic
                    />
                </Header>
            </Grid.Column>
        );
    }
}

export const createInventory: any = (
    entity: Entity, 
    itemClickMethod: (Item: Item) => {}, 
    buttonValue: string
) => (
        <Grid 
            stackable={true} 
            container={true} 
            centered={true} 
            columns={3}
        >
          {
                entity.inventory!.map(x =>
                    (<InventoryItem
                        key={x.id + x.type}
                        item={x}
                        InteractWithItem={itemClickMethod}
                        buttonValue={buttonValue}
                    />)
                )
            }
        </Grid>
);