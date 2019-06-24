import React from 'react';
import Button from '../button/button';
import CalculatorModel from './calculator_model';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: new CalculatorModel(),
            /*
                While it seems neat and tidy to abstract the heavy lifting into the CalculatorModel
                It feels like unnecssary obfuscation, like when I'm in this component I know very little about how this works.
                All I can see here is the constants and that a value is updated and displayed.
                A core concept with React is that logic (JS), template (HTML), and style (CSS)
                should be bundled together into components that are reusable
                Of course, there are cases when different visual components will want to reuse the same logic
                in which case, this type of approach of separating the logic from the view makes more sense
                But unless that case is a reality or an impending reality I would avoid unnecessary abstraction
                since it makes the code harder to read/maintain
            */
            currentDisplay: 0
        };

        this.zeroDecimal = ['0', '.'];
        this.numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this.operators = ['+', '-', '*', '/', '='];
        /*
            I feel like 'AC' is an operator
            instead of evaluating the stack (=) or performing and operation for left and right in the stack
            it clears the stack, but it's an operation nonetheless unlike the numbers which are values to be operated on
        */
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