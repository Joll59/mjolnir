import * as React from 'react';
import { arrayEquals } from '../helpers';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { Doorways } from '../models/doorways';

interface TableCellData {
    row: number;
    column: number;
    doorways: Doorways;
    playerLocation: [number, number];
}

interface GamemapData {
    mapPath: Doorways;
    playerLocation: [number, number];
    showComponent: boolean;
}

const TableData = ({ column, row, doorways, playerLocation }: TableCellData) => (
    <td
        className={arrayEquals(playerLocation, [row, column]) ? 'flash green center' : 'black center'}
    >
        {
            (doorways.isRoomConnected([row, column]))
                ? <Icon className={'larger'} iconName={'BoxAdditionSolid'} />
                : <Icon className={'larger'} iconName={'StopSolid'} />

        }
    </td>
);

const tableRow = (column: number, doorways: Doorways, playerLocation: [number, number]) => {
    let entireRow = [];
    for (let j = 0; j < doorways.row; j++) {
        entireRow.push((
            <TableData
                key={`${column + j}`}
                doorways={doorways}
                column={column}
                row={j}
                playerLocation={playerLocation}
            />));
    }
    return <tr key={column}>{entireRow}</tr>;
};

const createGrid = (doorways: Doorways, playerLocation: [number, number]) => {
    let tableBody = [];
    for (let i = 0; i < doorways.column; i++) {
        tableBody.push(tableRow(i, doorways, playerLocation));
    }
    return <tbody>{tableBody}</tbody>;
};

export const Gamemap = ({ mapPath, playerLocation, showComponent }: GamemapData, ) => (
    <table className={'miniMap'}>
        {showComponent ? createGrid(mapPath, playerLocation): <div/>}
    </table>
);