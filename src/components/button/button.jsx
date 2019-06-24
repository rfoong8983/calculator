import React from 'react';

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

        if (model.isOperation(buttonVal)) {
            model.performOp(buttonVal);
            /*
                It feels like, minimally, there are actually two types of buttons, perhaps three
                <Number /> and <Operator /> (<Utility />? I think this is pretty similar to operator, not 100% sure though).
                These can be implemented as wrappers around a more generic <Button />
                Otherwise you get this kind of extra branching logic that I think is better avoided in this case
                Because there are multiple concrete use cases for the two components I've defined above.
                i.e. 1 through 9 and the five(six?) operators.
            */
        } else if (model.isUtility(buttonVal)) {
            model.clearAll(buttonVal);
        } else {
            model.appendToBuilder(buttonVal);
        }

        // if (model.isOperation(buttonVal)) {
        //     model.performOp(buttonVal);

        // } else if (model.isUtility(buttonVal)) {
        //     model.clearAll(buttonVal);

        // } else if (model.isDecimal(buttonVal)) {
            
        // } else {
        //     model.addToStack(parseInt(buttonVal));
        // }
        
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