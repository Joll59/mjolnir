import * as React from 'react';
import { percentage25, percentage50, percentage80 } from '../helpers/random';
import { PlayerState, Item } from '../types';

interface PassedProps {
    player: PlayerState;
    methods: {
        pickUp: (Item: Item) => {},
        dropItem: (Item: Item) => {},
        setPlayerLocation: (x: number, y: number) => {},
    };
}

export class HeadsUpDisplay extends React.Component<PassedProps, { player: PlayerState }> {
    
    handleLocation = (e: React.MouseEvent<HTMLElement>) => {
        this.props.methods.setPlayerLocation(e.clientX, e.clientY);
    }

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
                        onMouseUp={(e) => this.handleLocation(e)}
                    /></div>
                <div>
                    {/*console.log(player.inventory.map(x => (x.type)))*/}
                    
                    {/*console.log(player.location)*/}
                </div>
            </div>
        );
    }
}