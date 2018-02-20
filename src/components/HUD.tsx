import * as React from 'react';
import { percentage25, percentage50, percentage80 } from '../helpers/random';
import { PlayerState, Item } from '../types';

interface PassedProps {
    player: PlayerState;
    methods: {
        pickUpItem: (Item: Item) => {},
        dropItem: (Item: Item) => {},
    };
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
                    /></div>
                <div>
                    {/*console.log(player.inventory.map(x => (x.type)))*/}
                </div>
            </div>
        );
    }
}