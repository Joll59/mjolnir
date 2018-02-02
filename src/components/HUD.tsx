import * as React from 'react';
import Player from '../models/player';
import { percentage25, percentage50, percentage80 } from '../helpers/random';

interface PassedProps {
    player: Player;
}

export class HeadsUpDisplay extends React.Component<PassedProps, {player: Player}> {
    // should meter component be a healthBar component?
    // <Inventory {player.inventory}/>
    // <Map />
    constructor(props: PassedProps) {
        super(props);
        this.state = {
            player: this.props.player
        };
    }

    render() {
        let { player } = this.state;
        return(
            <div className={player.health <= percentage25(player.initialHealth) ? 'center flash' : 'center'}>
            <meter 
                    value={player.health} 
                    min={0} 
                    low={percentage25(player.initialHealth)} 
                    optimum={percentage80(player.initialHealth)} 
                    high={percentage50(player.initialHealth)} 
                    max={player.initialHealth}
            />
              {console.log(player.inventory.map(
                  x => (x.type)
                ))} 
              </div>
        );
    }
}