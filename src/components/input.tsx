import * as React from 'react';
import { MessageInterface } from '../interfaces/index';
import * as Rx from 'rxjs';

interface LocalObserver {
    next: (arg: string) => void;
    error: (arg: Error) => void ;
    complete: () => void ;
}

interface LocalState {
    inputActive: boolean;
    userEntry: MessageInterface;
}

export default class Input extends React.Component<{}, LocalState> {

    constructor(props: any) {
        super(props);
        this.state = {
            inputActive: false,
            userEntry: { author: 'User', text: '' }
        };
    }
    
    subscribe = (obs: LocalObserver) => {
        try {
            obs.next('first next');
        } catch (err) {
            obs.error(err);
        } finally {
            obs.next('next in finally block');
            obs.complete();
        }
        return function unsubscribe() {
            console.log('that\'s all folks');
        }; 
     }

     executeObservable = () => {
        let tester = Rx.Observable.create(this.subscribe);
        return tester.subscribe({
            next: (value: string) => console.log(value),
            complete: () => console.log('completed this turn!!')
        });
     }
    
    handleEntry = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let data = ({ author: 'User', text: e.currentTarget.value });
        if (e.keyCode === 13 && !e.shiftKey) {
            this.submitEntry(e, data);
        }
    }

    submitEntry = (e: React.KeyboardEvent<HTMLInputElement>, data: MessageInterface) => {
        e.preventDefault();
        this.setState({ userEntry: data });
        console.log(this.state.userEntry);
    }

    setInputActivity = () => {
        this.setState({ inputActive: !this.state.inputActive});
        this.executeObservable().unsubscribe();
    }

    render() {
        return (
            <input
                onFocus={this.setInputActivity}
                onBlur={this.setInputActivity}
                contentEditable={true}
                tabIndex={0}
                required={true}
                onKeyDown={(e: any) => this.handleEntry(e)}
                placeholder="Write a reply..."
            />
        );
    }
}