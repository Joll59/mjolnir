import * as Rx from 'rxjs';
import { MiddlewareAPI } from 'redux';
import { ActionsObservable, Epic } from 'redux-observable';
import { StoreState, InputAction$, roomAction } from '../types';
import { handleBotChatOuput } from '../actions/user';

// import { Observable, Observer } from 'rx';

export const TestEpic: Epic<InputAction$, StoreState> = (action$: ActionsObservable<InputAction$>, store: MiddlewareAPI<StoreState>): Rx.Observable<InputAction$> => {
	// this is a test. 
	return action$.ofType(roomAction.playerTakesItem)
		.mapTo(handleBotChatOuput("TEST EPIC SUCCESSFUL!!!!!"));
};