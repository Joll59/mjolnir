import * as React from 'react';
import { MessageInterface } from '../types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as Rx from 'rxjs';

interface LocalState {
    userEntry: MessageInterface;
}

interface Props {
 userChatInput: Rx.Subject<string> ;
}

export default class Input extends React.Component<Props, LocalState> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            userEntry: { author: 'User', text: '' }
        };
    }
    
    handleEntry = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13 && !e.shiftKey && e.currentTarget.value !== '') {
            this.props.userChatInput.next(e.currentTarget!.value);
            e.currentTarget.value = '';
        }
        let data = ({ author: 'User', text: e.currentTarget.value});
        this.setState({ userEntry: data});
    }
      
    render() {
        return (
            <TextField
                type="text"
                contentEditable={true}
                tabIndex={0}
                required={true}
                value={this.state.userEntry.text}
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => this.handleEntry(e)}
                placeholder="Input Commands"
            />
        );
    }
}