// import { Doorways } from './doorways';
import * as React from 'react';

interface MapRowData {
    rows: Array<[number, number]>;
    mapPath: any;
}

interface WholeGrid {
    grid: Array<Array<[number, number]>>;
    mapPath: any;
}

const rowData = (data: [number, number], mapPath: any) => {
    if (mapPath.getConnectedDoorways(data).length > 0) {
        return '-';
    } else {
        return `${data[0]}${data[1]}`;
    }
};

const MapRow = ({ rows, mapPath }: MapRowData) => (
    <tr>
        {
            rows.map((data, index) =>
                <td key={index}>
                    {
                        rowData(data, mapPath)
                    }
                </td>
            )
        }
    </tr>
);

export const GameMap = ({ grid, mapPath }: WholeGrid, ) => (
    <table>
        <tbody>
            {
                grid.map((rows, index) =>
                    <MapRow key={index} mapPath={mapPath} rows={rows} />
                )
            }
        </tbody>
    </table>
);