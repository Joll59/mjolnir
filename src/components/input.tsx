import * as React from 'react';

class Input extends React.Component<{}, {}> {

    constructor() {
        super({});
        this.state = {
            inputActive: false
        };
    }

    handleEntry(event: KeyboardEvent) {
        if (event.keyCode === 13 && !event.shiftKey) {
            this.submitEntry(event);
          }
    }

    submitEntry(event: any) {
        event.preventDefault();
    }

    setInputActivity() {
        this.setState({ inputActive: !!true });
    }

    render() {
        return (
            <form>
                <div 
                    onFocus={this.setInputActivity} 
                    onBlur={this.setInputActivity}
                />
            </form>
        );
    }
}

export default Input;