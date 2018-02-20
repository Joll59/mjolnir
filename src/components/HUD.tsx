import * as React from 'react';
import { percentage25, percentage50, percentage80 } from '../helpers/random';
import { PlayerState, Item } from '../types';
import { dropItem } from '../actions/player';

interface PassedProps {
    player: PlayerState;
    dropItem: (Item: Item) => {};
}

export class HeadsUpDisplay extends React.Component<PassedProps, { player: PlayerState }> {

    render() {
        let { player } = this.props;
        return (
            <div>
                <div className="center">
                    <meter
                        className={player.health <= percentage25(player.initialHealth) ? 'flash' : ''}
                        value={player.health}
                        min={0}
                        low={percentage25(player.initialHealth)}
                        optimum={percentage80(player.initialHealth)}
                        high={percentage50(player.initialHealth)}
                        max={player.initialHealth}
                    />
                </div>
                <div className="wrapper">
                    {(player.inventory.map(x => playerItemInInventory(x, dropItem)))}
                </div>
            </div>
        );
    }
}

const playerItemInInventory = (item: Item, dropItem: (Item: Item) => {}) => {
    let view: boolean = false;
    const changeView = () => {
        view = !view
    }

    return (
        <div onFocus={changeView} onBlur={changeView}>
            {view ? <button type="drop item" onClick={() => dropItem(item)} /> : <div />}
            {item.id}
            {item.type}
            {item.name}
        </div>
    );
}