import * as React from "react";

export default class Input extends React.Component {

    constructor() {
        super();
        this.state = {
            inputActive: false
        };
    }

    handleEntry(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            this.submitEntry(event);
          }
    }

    submitEntry(event) {
        event.preventDefault();
    }

    render() {
        return (
            <form className={`${(this.state.inputActive ? 'active' : '')}`}>
                <div
                    onFocus={() => this.setState({ inputActive: true });}
                    onBlur={() => { this.setState({ inputActive: false }); }}
                    ref={(e) => { this.userInput = e; }}
                    onKeyDown={this.handleEntry}
                    contentEditable="true"
                    placeholder="Write a reply..."
                    className=""/>
            
                {/* <div>
                    <div/>
                </div> */}
            </form>

        );
    }
}