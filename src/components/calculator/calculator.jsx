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

        this.zeroDecimal = ['0', '.'];
        this.numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this.operators = ['+', '-', '*', '/', '='];
        this.utilities = ['AC'];

        this.displaySection = this.displaySection.bind(this);
        this.updateCurrentDisplay = this.updateCurrentDisplay.bind(this);
    }

    updateCurrentDisplay() {
        const model = this.state.model;

        this.setState(_ => {
            return {currentDisplay: model.currentDisplay};
        });
    }
    

    displaySection(arr) {
        const model = this.state.model;

        return arr.map(val => (
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
                <div className="calculator__screen">
                    {this.state.currentDisplay}
                </div>
                <br></br>
                <div className="calculator__numbers">
                    {this.displaySection(this.numbers)}
                </div>
                <div className="calculator__zeroDecimal">
                    {this.displaySection(this.zeroDecimal)}
                </div>
                <div className="calculator__operations">
                    {this.displaySection(this.utilities)}
                </div>
            </>
        )
    }
}

export default Calculator;