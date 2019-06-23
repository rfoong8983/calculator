import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.val = props.val;
        this.model = props.model;
        this.updateCurrentDisplay = props.updateCurrentDisplay;
        this.operations = {
            '+': this.model.performOp('+'),
            '-': this.model.performOp('-'),
            '*': this.model.performOp('*'),
            '/': this.model.performOp('/'),
            '=': this.model.evalStack
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const buttonVal = this.val;

        if (buttonVal in this.operations) {
            this.operations[buttonVal]();
        } else {
            this.model.addToStack(parseInt(buttonVal));
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