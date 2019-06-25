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
        this.acPlus = ['AC', '+'];
        this.numbersTopSubtr = ['7', '8', '9', '-'];
        this.numbersMidMult = ['4', '5', '6', '*'];
        this.numbersBotDiv = ['1', '2', '3', '/'];
        this.zeroDecEquals = ['0', '.', '='];

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.displaySection = this.displaySection.bind(this);
        this.updateCurrentDisplay = this.updateCurrentDisplay.bind(this);
    }

    updateCurrentDisplay() {
        const model = this.state.model;
        let newDisplay = model.currentDisplay;

        // if the currentDisplay is a decimal, add a zero in front
        if (newDisplay[0] === '.') newDisplay = '0' + newDisplay;

        this.setState(_ => {
            return {currentDisplay: newDisplay};
        });
    }

    handleKeyPress = (event) => {
        // either perform an operation, clear stacks, or append to the number being built
        // do nothing for invalid keys e.g., shift
        event.preventDefault();
        const model = this.state.model;
        if (event.key === 'Enter') event.key = '=';
        if (event.key === 'Backspace') event.key = 'AC';
        
        if (model.isOperation(event.key) || model.isEquals(event.key)) {
            model.performOp(event.key);
        } else if (model.isUtility(event.key)) {
            model.clearAll(event.key);
        } else if (model.isNumber(event.key)) {
            model.appendToBuilder(event.key);
        } else {
            return;
        }

        // update current display on key press
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

                <div className="calculator__buttonRowWrapper">
                    <div className="calculator__acPlus">
                        {this.displaySection(this.acPlus)}
                    </div>

                    <div className="calculator__columnWrapper">
                        <div className="calculator__numbersTopSubtr">
                            {this.displaySection(this.numbersTopSubtr.slice(0,2))}
                        </div>
                        <div className="calculator__numbersTopSubtr">
                            {this.displaySection(this.numbersTopSubtr.slice(2))}
                        </div>
                    </div>

                    <div className="calculator__columnWrapper">
                        <div className="calculator__numbersMidMult">
                            {this.displaySection(this.numbersMidMult.slice(0,2))}
                        </div>
                        <div className="calculator__numbersMidMult">
                            {this.displaySection(this.numbersMidMult.slice(2))}
                        </div>
                    </div>

                    <div className="calculator__columnWrapper">
                        <div className="calculator__numbersBotDiv">
                            {this.displaySection(this.numbersBotDiv.slice(0,2))}
                        </div>
                        <div className="calculator__numbersBotDiv">
                            {this.displaySection(this.numbersBotDiv.slice(2))}
                        </div>
                    </div>

                    <div className="calculator__columnWrapper">
                        <div className="calculator__zeroDecEquals">
                            {this.displaySection(this.zeroDecEquals.slice(0,1))}
                        </div>
                        <div className="calculator__zeroDecEquals">
                            {this.displaySection(this.zeroDecEquals.slice(1))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calculator;