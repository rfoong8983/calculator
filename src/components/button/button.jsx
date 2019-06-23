import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.val = props.val;
        this.model = props.model;
        this.updateCurrentDisplay = props.updateCurrentDisplay;
        this.operations = {
            '+': this.model.add,
            '-': this.model.subtract,
            '*': this.model.multiply,
            '/': this.model.divide,
            '=': this.model.evalStack
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.val in this.operations) {
            this.operations[this.val]();
        } else {
            this.model.addToStack(parseInt(this.val));
        }
        
        this.updateCurrentDisplay();
    }

    render() {
        return(
            <button onClick={this.handleClick}>
                {this.val}
            </button>
        )
    }
}

export default Button;