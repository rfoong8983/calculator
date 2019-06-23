import React from 'react';
import Button from '../button/button';
import CalculatorModel from './calculator_model';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: new CalculatorModel(),
            currentDisplay: 0
        };

        this.buttons = ['0', '1', '3', '+', '-', '*', '/', '=', 'AC'];

        this.displayButtons = this.displayButtons.bind(this);
        this.updateCurrentDisplay = this.updateCurrentDisplay.bind(this);
    }

    updateCurrentDisplay() {
        const model = this.state.model;

        this.setState(_ => {
            return {currentDisplay: model.currentDisplay};
        });
    }
    

    displayButtons() {
        const model = this.state.model;

        return this.buttons.map(val => (
            <Button
                model={model}
                updateCurrentDisplay={this.updateCurrentDisplay}
                val={val}
                key={val}
            />
        ));
    }

    render() {
        return (
            <>
                <div>myNewCalculator</div>
                {this.displayButtons()}
                <br></br>
                {this.state.currentDisplay}
            </>
        )
    }
}

export default Calculator;