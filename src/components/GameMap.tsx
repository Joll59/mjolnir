// import { Doorways } from './doorways';
import * as React from 'react';
import { arrayEquals } from '../helpers/random';

interface MapRowData {
    rows: Array<[number, number]>;
    mapPath: any;
    playerLocation: [number, number];
}

interface WholeGrid {
    grid: Array<Array<[number, number]>>;
    mapPath: any;
    playerLocation: [number, number];
}

const rowData = (data: [number, number], mapPath: any) => {
    if (mapPath.getConnectedDoorways(data).length > 0) {
        return ` + `;
    } else {
        return `[_]`;
    }
};

const MapRow = ({ rows, mapPath, playerLocation }: MapRowData) => (
    <tr>
        {
            rows.map((data, index) =>
                <td 
                    key={index}
                    className={arrayEquals(playerLocation, data) ? 'flash red center' : 'black center'}
                >
                    {
                        rowData(data, mapPath)
                    }
                </td>
            )
        }
    </tr>
);

export const Gamemap = ({ grid, mapPath, playerLocation }: WholeGrid, ) => (
    <table>
        <tbody>
            {
                grid.map((rows, index) =>
                    <MapRow key={index} mapPath={mapPath} rows={rows} playerLocation={playerLocation} />
                )
            }
        </tbody>
    </table>
);