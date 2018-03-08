import * as React from 'react';
import { MessageInterface } from '../types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

interface LocalState {
    inputActive: boolean;
    userEntry: MessageInterface;
}

interface Props {
 userChatInput: (e: React.SyntheticEvent<Element>) => void ;
}

export default class Input extends React.Component<Props, LocalState> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            inputActive: false,
            userEntry: { author: 'User', text: '' }
        };
    }
    
    handleEntry = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13 && !e.shiftKey && e.currentTarget.value !== '') {
            // debugger
            this.props.userChatInput(e);
            e.currentTarget.value = '';
        }
        let data = ({ author: 'User', text: e.currentTarget.value});
        this.setState({ userEntry: data});
    }
    
    setInputActivity = () => {
        this.setState({ inputActive: !this.state.inputActive}); 
    }
    
    render() {
        return (
            <TextField
                type="text"
                onFocus={this.setInputActivity}
                onBlur={this.setInputActivity}
                contentEditable={true}
                tabIndex={0}
                required={true}
                value={this.state.userEntry.text}
                // onChange={(e: any) => this.handleEntry(e)}
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => this.handleEntry(e)}
                placeholder="Input Commands"
            />
        );
    }
}