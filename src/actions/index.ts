import * as constants from '../constants';

export interface ClickedOnObject {
    type: constants.CLICKED_ON_OBJECT;
}

export interface ClickedOnFeature {
    type: constants.CLICKED_ON_FEATURE;
}

export type ObjectClick = ClickedOnObject | ClickedOnFeature;

export function clickedOnObject(): ClickedOnObject {
    return {
        type: constants.CLICKED_ON_OBJECT
    };
}

export function clickedOnFeature(): ClickedOnFeature {
    return {
        type: constants.CLICKED_ON_FEATURE
    };
}
