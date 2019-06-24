import React from 'react';
import '../../stylesheets/button.css';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.val = props.val;
        this.model = props.model;
        this.updateCurrentDisplay = props.updateCurrentDisplay;

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const buttonVal = this.val;
        const model = this.model;

        if (model.isOperation(buttonVal) || model.isEquals(buttonVal)) {
            model.performOp(buttonVal);
        } else if (model.isUtility(buttonVal)) {
            model.clearAll(buttonVal);
        } else {
            model.appendToBuilder(buttonVal);
        }
        
        this.updateCurrentDisplay();
    }

    render() {
        return(
            <button id={`button__${this.val}`} onClick={this.handleClick}>
                {this.val}
            </button>
        )
    }
}

export default Button;