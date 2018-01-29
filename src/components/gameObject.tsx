import * as React from 'react';
import { MouseEvent } from 'react';

interface ObjectProps {
    description: string;
    clicked: (e: MouseEvent<HTMLButtonElement>) => {};
}

const GameObject = ({description, clicked}: ObjectProps): JSX.Element => (
    <div className="App">
        <h1>Description: {description}</h1>
        <button onClick={clicked}>feature</button>
        <button onClick={clicked}>object</button>
    </div>
);
export default GameObject;