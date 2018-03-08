import { Item, Entity } from '../types';
import * as React from 'react';
import { Button, Header, Icon, Grid } from 'semantic-ui-react';

interface ItemProps {
    item: Item; 
    InteractWithItem: (Item: Item) => {};
    buttonValue: string;
}

export class InventoryItem extends React.Component<ItemProps, {view: boolean}> {
    
    constructor (props: ItemProps) {
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
            <Button 
                animated={true}
                size="mini"
                onClick={this.handleItemInteraction} 
                title={this.props.buttonValue} 
                aria-label={this.props.buttonValue}
            >
                <Button.Content 
                    visible={true}
                > 
                    {this.props.buttonValue}
                </Button.Content>
                <Button.Content 
                    hidden={true}
                >
                    <Icon 
                        name="external"
                    />
                </Button.Content>
            </Button>);

        const item = (<p>{this.props.item.name}</p>);

        return (
            <Grid.Column 
                textAlign="center" 
                onClick={this.changeView}
                className={"inventoryItem"}
            > 
                    <Header as="h4">
                        {item}
                    </Header>
                        {this.state.view ? <Icon name="world" size="small" /> : itemInteractButton}
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
            divided={true} 
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