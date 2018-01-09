import { Reducer } from 'redux';
import { ObjectClick } from '../actions';
import { StoreState } from '../types/index';
import { CLICKED_ON_OBJECT, CLICKED_ON_FEATURE } from '../constants/index';

let InitialState: StoreState = {item: {type: 'hi'}, description: 'New Description'};
const interactReducer: Reducer<StoreState> = (state = InitialState, action: ObjectClick): StoreState => {
    switch (action.type) {
        case CLICKED_ON_OBJECT:
            return {...state, description: 'Clicked_on_Object'};
        case CLICKED_ON_FEATURE:
            return {...state, description: 'Clicked_On_feature'};
        default:
            return state;
    }
};

export default interactReducer;