import * as React from 'react';
type ObjectProps = {
    description: string,
    feature: () => {},
    object: () => {}
};

const Object = ({description, feature, object}: ObjectProps) => (
    
    <div className="App-header App">
        <h1>Description: {description}</h1>
        <button onClick={feature}>feature</button>
        <button onClick={object}>object</button>
    </div>
);

export default Object;