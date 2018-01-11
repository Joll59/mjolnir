// export const CLICKED_ON_OBJECT = 'CLICKED_ON_OBJECT';
// export type CLICKED_ON_OBJECT = typeof CLICKED_ON_OBJECT;

// export const CLICKED_ON_FEATURE = 'CLICKED_ON_FEATURE';
// export type CLICKED_ON_FEATURE = typeof CLICKED_ON_FEATURE;
import { StoreState } from '../interfaces/index';

export enum type {
    CLICKED = 'CLICKED'
}

export const InitialState: StoreState = {item: {type: ''}, description: '', messageList: [{author: 'Bot', text: 'Hi'}]};
