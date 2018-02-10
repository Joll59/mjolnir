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
       return  `${data[0]}${data[1]}`;
    }
};

const MapRow = ( {rows, mapPath}: MapRowData ) => (
    <tr> {
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

export const MiniMap = ({grid, mapPath}: WholeGrid, ) => (
    <table>
    {
        grid.map((rows, index) => 
        // tslint:disable-next-line:jsx-key
            <MapRow key={index} mapPath={mapPath} rows={rows}/>
        )
    }
    </table>
);