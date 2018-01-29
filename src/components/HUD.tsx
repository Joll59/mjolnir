import * as React from 'react';
// import Player from '../models/player/Player';
import { percentage25, percentage50, percentage80 } from '../helpers/random';

const HeadsUpDisplay = ({ player }:any ) => {
    // should meter component be a healthBar component?
    // <Inventory {player.inventory}/>
    // <Map />
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
                
            </div>
        );
    };
export default HeadsUpDisplay;