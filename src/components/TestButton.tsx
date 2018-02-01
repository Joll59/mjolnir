import * as React from 'react';
import { MouseEvent } from 'react';

interface ObjectProps {
    clicked: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const TestButton = ({clicked}: ObjectProps): JSX.Element => (
    <div className="App">
        <button onClick={clicked}>Click To Decrease Health</button>
    </div>
);