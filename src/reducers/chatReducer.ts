import { Reducer } from 'redux';
// import { ObjectClick } from '../actions';
import { StoreState } from '../interfaces/index';
import { type, InitialState } from '../constants/index';
import { ObjectClick } from '../actions/index';

// let InitialState: StoreState = {item: {type: ''}, description: '', messageList: []};

const chatReducer: Reducer<StoreState> = (state= InitialState, action: ObjectClick): StoreState => {
    switch (action.type) {
        case type.CLICKED:
            return {...state, description: action.payload.text, messageList: [...state.messageList, action.payload] };
        default:
            return state;
    }
};

export default chatReducer;