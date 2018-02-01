import * as React from 'react';
import { MessageInterface } from '../types';

interface LocalState {
    inputActive: boolean;
    userEntry: MessageInterface;
}

interface Props {
 userInput: (e: React.SyntheticEvent<Element>) => {} ;
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
            this.props.userInput(e);
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
            <input
                type="text"
                onFocus={this.setInputActivity}
                onBlur={this.setInputActivity}
                contentEditable={true}
                tabIndex={0}
                required={true}
                // value={this.state.userEntry.text}
                // onChange={(e: any) => this.handleEntry(e)}
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => this.handleEntry(e)}
                placeholder="Write Stuff"
            />
        );
    }
}