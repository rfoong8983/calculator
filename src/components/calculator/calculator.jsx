import React from 'react';
import CalculatorModel from './calculator_model';
import Button from '../button/button';
import '../../stylesheets/calculator.css';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: new CalculatorModel(),
            currentDisplay: 0
        };

        // Created separate arrays to organize button positions;
        this.zeroDecimal = ['0', '.'];
        this.numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];
        this.operators = ['+', '-', '*', '/', '='];
        this.utilities = ['AC'];

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.displaySection = this.displaySection.bind(this);
        this.updateCurrentDisplay = this.updateCurrentDisplay.bind(this);
    }

    updateCurrentDisplay() {
        const model = this.state.model;
        let newDisplay = model.currentDisplay;
        if (newDisplay[0] === '.') newDisplay = '0' + newDisplay;

        this.setState(_ => {
            return {currentDisplay: newDisplay};
        });
    }

    handleKeyPress = (event) => {
        event.preventDefault();
        const model = this.state.model;
        if (event.key === 'Enter') event.key = '=';
        
        if (model.isOperation(event.key) || model.isEquals(event.key)) {
            model.performOp(event.key);
        } else if (model.isUtility(event.key)) {
            model.clearAll(event.key);
        } else if (model.isNumber(event.key)) {
            model.appendToBuilder(event.key);
        } else {
            return;
        }

        this.updateCurrentDisplay();
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
            <div className="calculator__wrapper" onKeyDown={this.handleKeyPress}>
                <div className="calculator__screen">
                    <p>{this.state.currentDisplay}</p>
                </div>

                <div className="calculator__columnWrapper">
                    <div className="calculator__leftColumn">
                        <div className="calculator__utilities">
                            {this.displaySection(this.utilities)}
                        </div>
                        <div className="calculator__numbers">
                            {this.displaySection(this.numbers)}
                        </div>
                        <div className="calculator__zeroDecimal">
                            {this.displaySection(this.zeroDecimal)}
                        </div>
                    </div>

                    <div className="calculator__rightColumn">
                        <div className="calculator__operators">
                            {this.displaySection(this.operators)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calculator;