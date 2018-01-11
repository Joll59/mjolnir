import { Reducer } from 'redux';
import { ObjectClick } from '../actions';
import { StoreState } from '../interfaces/index';
import { type, InitialState } from '../constants/index';

// let InitialState: StoreState = {item: {type: ''}, description: '', messageList: []};

const clickReducer: Reducer<StoreState> = (state = InitialState, action: ObjectClick): StoreState => {
    switch (action.type) {
        case type.CLICKED:
            return {
                ...state, description: description(state, action),
                messageList: [...state.messageList, action.payload]
            };
        default:
            return state;
    }
};
// IDEA: Reducer compostion.....will this help?

const description = (state = InitialState, action: ObjectClick): string => {
    return action.payload.text;
};

export default clickReducer;