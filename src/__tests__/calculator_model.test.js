import CalculatorModel from '../components/calculator/calculator_model';


describe('when building a number', () => {
    test('it builds a decimal properly and pushes it to the stack', () => {
        const calc = new CalculatorModel();
        calc.appendToBuilder('1');
        calc.appendToBuilder('.');
        calc.appendToBuilder('1');
        expect(calc.numberBuilder).toHaveLength(3);
    });

    test('it resets on press of operation', () => {
        const calc = new CalculatorModel();
        calc.appendToBuilder('1');
        calc.appendToBuilder('.');
        calc.appendToBuilder('1');
        expect(calc.numberBuilder).toHaveLength(3);
        calc.performOp('=');
        expect(calc.numberBuilder).toHaveLength(0);
        expect(calc.stack).toHaveLength(2);
        calc.performOp('-');
        expect(calc.numberBuilder).toHaveLength(0);
    });
});

describe('adds values to a stack', () => {

    describe('when the value is a number', () => {

        test('it does not add a number to the operator stack', () => {
            const calc = new CalculatorModel();
            calc.appendToBuilder(1);
            expect(calc.operatorStack).toHaveLength(0);
        });

        test('it adds a number to the number stack', () => {
            const calc = new CalculatorModel();
            calc.appendToBuilder('1');
            expect(calc.stack).toHaveLength(1);
            expect(calc.numberBuilder).toHaveLength(1);
        });

        test('it updates current display', () => {
            const calc = new CalculatorModel();
            calc.appendToBuilder('1');
            expect(calc.currentDisplay).toEqual('1');
        });
    });

    describe('when the value is an operator', () => {

        test('it does not add an operator to the number stack', () => {
            const calc = new CalculatorModel();
            calc.performOp('+');
            calc.performOp('-');
            calc.performOp('*');
            calc.performOp('/');
            expect(calc.stack).toHaveLength(1);
        });

        test('it adds an operator to the operator stack if the last input was a number', () => {
            const calc = new CalculatorModel();
            calc.appendToBuilder('1');
            calc.performOp('+');
            expect(calc.stack).toHaveLength(2);
            expect(calc.numberBuilder).toHaveLength(0);
            calc.performOp('*');
            expect(calc.operatorStack).toHaveLength(1);
        });

        test('it replaces the last operator if the last input was an operator', () => {
            const calc = new CalculatorModel();
            calc.performOp('+');
            calc.performOp('/');
            calc.performOp('-');
            calc.performOp('*');
            expect(calc.operatorStack).toHaveLength(1);
        });

        test('it updates current display', () => {
            const calc = new CalculatorModel();
            calc.appendToBuilder(1);
            calc.performOp('+');
            calc.appendToBuilder(2);
            expect(calc.currentDisplay).toEqual('2');
        });

        describe('if there is an add operation on the operator stack', () => {

            test('add will evaluate the sum of the last two vals on the stack', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('+');
                calc.appendToBuilder(2);
                calc.performOp('+');
                expect(calc.currentDisplay).toEqual('3');
            });

            test('subtract will evaluate the sum of the last two vals on the stack', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('+');
                calc.appendToBuilder(2);
                calc.performOp('-');
                expect(calc.currentDisplay).toEqual('3');
            });

            test('multiply will display the last input', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('+');
                calc.appendToBuilder(2);
                calc.performOp('*');
                expect(calc.currentDisplay).toEqual('2');
            });

            test('divide will evaluate the sum of the last two vals on the stack', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('+');
                calc.appendToBuilder(2);
                calc.performOp('/');
                expect(calc.currentDisplay).toEqual('2');
            });

            test('add repeatedly pressed should only evaluate the last two vals once', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('+');
                calc.appendToBuilder(2);
                calc.performOp('+');
                calc.performOp('+');
                calc.performOp('+');
                calc.performOp('+');
                expect(calc.currentDisplay).toEqual('3');
            });
            test('subtract repeatedly pressed should only evaluate the last two vals once', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('+');
                calc.appendToBuilder(2);
                calc.performOp('-');
                calc.performOp('*');
                calc.performOp('*');
                calc.performOp('-');
                expect(calc.currentDisplay).toEqual('3');
            });
            test('multiply should not cause an error', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('+');
                calc.appendToBuilder(2);
                calc.performOp('*');
                calc.performOp('*');
                calc.performOp('*');
                calc.performOp('*');
                expect(calc.currentDisplay).toEqual('2');
            });
            test('divide should not cause an error', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('+');
                calc.appendToBuilder(2);
                calc.performOp('/');
                calc.performOp('/');
                calc.performOp('/');
                calc.performOp('/');
                expect(calc.currentDisplay).toEqual('2');
            });
        });

        describe('if there is a subtract operation on the operator stack', () => {

            test('add will evaluate the sum of the last two vals on the stack', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('-');
                calc.appendToBuilder(2);
                calc.performOp('+');
                expect(calc.currentDisplay).toEqual('-1');
            });

            test('subtract will evaluate the sum of the last two vals on the stack', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('-');
                calc.appendToBuilder(2);
                calc.performOp('-');
                expect(calc.currentDisplay).toEqual('-1');
            });

            test('multiply will display the last input', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(3);
                calc.performOp('-');
                calc.appendToBuilder(2);
                calc.performOp('*');
                expect(calc.currentDisplay).toEqual('2');
            });

            test('divide will evaluate the sum of the last two vals on the stack', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(3);
                calc.performOp('-');
                calc.appendToBuilder(2);
                calc.performOp('/');
                expect(calc.currentDisplay).toEqual('2');
            });

            test('add repeatedly pressed should only evaluate the last two vals once', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('-');
                calc.appendToBuilder(2);
                calc.performOp('+');
                calc.performOp('+');
                calc.performOp('+');
                calc.performOp('+');
                expect(calc.currentDisplay).toEqual('-1');
            });
            test('subtract repeatedly pressed should only evaluate the last two vals once', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('-');
                calc.appendToBuilder(2);
                calc.performOp('-');
                calc.performOp('*');
                calc.performOp('*');
                calc.performOp('-');
                expect(calc.currentDisplay).toEqual('-1');
            });
            test('multiply should not cause an error', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('-');
                calc.appendToBuilder(2);
                calc.performOp('*');
                calc.performOp('*');
                calc.performOp('*');
                calc.performOp('*');
                expect(calc.currentDisplay).toEqual('2');
            });
            test('divide should not cause an error', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('-');
                calc.appendToBuilder(2);
                calc.performOp('/');
                calc.performOp('/');
                calc.performOp('/');
                calc.performOp('/');
                expect(calc.currentDisplay).toEqual('2');
            });
        });

        describe('if there is a multiply operation on the operator stack', () => {

            test('add will evaluate the rest of the stack', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('+');
                calc.appendToBuilder(2);
                calc.performOp('*');
                calc.appendToBuilder(3);
                calc.performOp('+');
                expect(calc.currentDisplay).toEqual('7');
            });

            test('subtract will evaluate the rest of the stack', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('-');
                calc.appendToBuilder(2);
                calc.performOp('*');
                calc.appendToBuilder(3);
                calc.performOp('-');
                expect(calc.currentDisplay).toEqual('-5');
            });

            test('multiply will evaluate the last two vals on the stack', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(3);
                calc.performOp('*');
                calc.appendToBuilder(2);
                calc.performOp('*');
                expect(calc.currentDisplay).toEqual('6');
            });

            test('divide will evaluate the last two vals on the stack', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(3);
                calc.performOp('*');
                calc.appendToBuilder(2);
                calc.performOp('/');
                expect(calc.currentDisplay).toEqual('6');
            });

            test('add repeatedly pressed should only evaluate the last two vals once', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(3);
                calc.performOp('*');
                calc.appendToBuilder(2);
                calc.performOp('+');
                calc.performOp('+');
                calc.performOp('+');
                calc.performOp('+');
                expect(calc.currentDisplay).toEqual('6');
            });
            test('subtract repeatedly pressed should only evaluate the last two vals once', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(3);
                calc.performOp('*');
                calc.appendToBuilder(2);
                calc.performOp('-');
                calc.performOp('*');
                calc.performOp('*');
                calc.performOp('-');
                expect(calc.currentDisplay).toEqual('6');
            });
            test('multiply should not cause an error', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('*');
                calc.appendToBuilder(2);
                calc.performOp('*');
                calc.performOp('*');
                calc.performOp('*');
                calc.performOp('*');
                expect(calc.currentDisplay).toEqual('2');
            });
            test('divide should not cause an error', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('*');
                calc.appendToBuilder(2);
                calc.performOp('/');
                calc.performOp('/');
                calc.performOp('/');
                calc.performOp('/');
                expect(calc.currentDisplay).toEqual('2');
            });
        });

        describe('if there is a divide operation on the operator stack', () => {

            test('add will evaluate the last operation', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('/');
                calc.appendToBuilder(2);
                calc.performOp('+');
                expect(calc.currentDisplay).toEqual('0.5');
            });

            test('subtract will evaluate the last operation', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('/');
                calc.appendToBuilder(2);
                calc.performOp('-');
                expect(calc.currentDisplay).toEqual('0.5');
            });

            test('multiply will evaluate the the last operation', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('/');
                calc.appendToBuilder(2);
                calc.performOp('*');
                expect(calc.currentDisplay).toEqual('0.5');
            });

            test('divide will evaluate the last operation', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('/');
                calc.appendToBuilder(2);
                calc.performOp('/');
                expect(calc.currentDisplay).toEqual('0.5');
            });

            test('(long decimals) add will evaluate the last operation', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(2);
                calc.performOp('/');
                calc.appendToBuilder(3);
                calc.performOp('+');
                expect(calc.currentDisplay).toEqual('0.6666666666666666');
            });

            test('(long decimals) subtract will evaluate the last operation', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(2);
                calc.performOp('/');
                calc.appendToBuilder(3);
                calc.performOp('-');
                expect(calc.currentDisplay).toEqual('0.6666666666666666');
            });

            test('(long decimals) multiply will evaluate the the last operation', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(2);
                calc.performOp('/');
                calc.appendToBuilder(3);
                calc.performOp('*');
                expect(calc.currentDisplay).toEqual('0.6666666666666666');
            });

            test('(long decimals) divide will evaluate the last operation', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(2);
                calc.performOp('/');
                calc.appendToBuilder(3);
                calc.performOp('/');
                expect(calc.currentDisplay).toEqual('0.6666666666666666');
            });

            test('add repeatedly pressed should only evaluate the last two vals once', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('/');
                calc.appendToBuilder(2);
                calc.performOp('+');
                calc.performOp('+');
                calc.performOp('+');
                calc.performOp('+');
                expect(calc.currentDisplay).toEqual('0.5');
            });
            test('subtract repeatedly pressed should only evaluate the last two vals once', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('/');
                calc.appendToBuilder(2);
                calc.performOp('-');
                calc.performOp('*');
                calc.performOp('*');
                calc.performOp('-');
                expect(calc.currentDisplay).toEqual('0.5');
            });
            test('multiply should not cause an error', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('/');
                calc.appendToBuilder(2);
                calc.performOp('*');
                calc.performOp('*');
                calc.performOp('*');
                calc.performOp('*');
                expect(calc.currentDisplay).toEqual('0.5');
            });
            test('divide should not cause an error', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(1);
                calc.performOp('/');
                calc.appendToBuilder(2);
                calc.performOp('/');
                calc.performOp('/');
                calc.performOp('/');
                calc.performOp('/');
                expect(calc.currentDisplay).toEqual('0.5');
            });

            test('(long decimals) add repeatedly pressed should only evaluate the last two vals once', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(2);
                calc.performOp('/');
                calc.appendToBuilder(3);
                calc.performOp('+');
                calc.performOp('+');
                calc.performOp('+');
                calc.performOp('+');
                expect(calc.currentDisplay).toEqual('0.6666666666666666');
            });
            test('(long decimals) subtract repeatedly pressed should only evaluate the last two vals once', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(2);
                calc.performOp('/');
                calc.appendToBuilder(3);
                calc.performOp('-');
                calc.performOp('*');
                calc.performOp('*');
                calc.performOp('-');
                expect(calc.currentDisplay).toEqual('0.6666666666666666');
            });
            test('(long decimals) multiply should not cause an error', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(2);
                calc.performOp('/');
                calc.appendToBuilder(3);
                calc.performOp('*');
                calc.performOp('*');
                calc.performOp('*');
                calc.performOp('*');
                expect(calc.currentDisplay).toEqual('0.6666666666666666');
            });
            test('(long decimals) divide should not cause an error', () => {
                const calc = new CalculatorModel();
                calc.appendToBuilder(2);
                calc.performOp('/');
                calc.appendToBuilder(3);
                calc.performOp('/');
                calc.performOp('/');
                calc.performOp('/');
                calc.performOp('/');
                expect(calc.currentDisplay).toEqual('0.6666666666666666');
            });
        });
    });
});

describe('handles invalid equations', () => {
    test('it will not divide by 0', () => {
        const calc = new CalculatorModel();
        calc.performOp('/');
        calc.appendToBuilder(0);
        calc.performOp('-');
        calc.appendToBuilder(3);
        calc.performOp('=');
        expect(calc.currentDisplay).toEqual('NaN');
    });
});

describe('if the button value is AC', () => {

    test('it clears both stacks', () => {
        const calc = new CalculatorModel();
        calc.appendToBuilder(2);
        calc.performOp('+');
        calc.appendToBuilder(2);
        calc.performOp('-');
        calc.appendToBuilder(3);
        calc.performOp('=');
        calc.clearAll();
        expect(calc.stack).toHaveLength(0);
        expect(calc.operatorStack).toHaveLength(0);
        expect(calc.currentDisplay).toEqual('0');
    });

    test('it clears both stacks', () => {
        const calc = new CalculatorModel();
        calc.performOp('/');
        calc.appendToBuilder(2);
        calc.performOp('*');
        calc.appendToBuilder(3);
        calc.performOp('=');
        calc.clearAll();
        expect(calc.stack).toHaveLength(0);
        expect(calc.operatorStack).toHaveLength(0);
        expect(calc.currentDisplay).toEqual('0');
    });
});

describe('if the button value is equals', () => {

    describe ('when there are single operations of the same type (e.g., add & subtr or mult & div)', () => {

        test('it evaluates the entire stack and the number stack only contains the result', () => {

            const calc = new CalculatorModel();
            calc.appendToBuilder(2);
            calc.performOp('+');
            calc.appendToBuilder(2);
            calc.performOp('-');
            calc.appendToBuilder(3);
            calc.performOp('=');
            expect(calc.stack).toHaveLength(2);
            expect(calc.currentDisplay).toEqual('1');
        });

        test('it evaluates the entire stack and the number stack only contains the result', () => {

            const calc = new CalculatorModel();
            calc.appendToBuilder(2);
            calc.performOp('*');
            calc.appendToBuilder(2);
            calc.performOp('*');
            calc.appendToBuilder(3);
            calc.performOp('=');
            expect(calc.stack).toHaveLength(2);
            expect(calc.currentDisplay).toEqual('12');
        });

        test('it evaluates the entire stack and the number stack only contains the result', () => {

            const calc = new CalculatorModel();
            calc.appendToBuilder(2);
            calc.performOp('/');
            calc.appendToBuilder(3);
            calc.performOp('*');
            calc.appendToBuilder(4);
            calc.performOp('=');
            expect(calc.stack).toHaveLength(2);
            expect(calc.currentDisplay).toEqual('2.6666666666666665');
        });

        test('it evaluates the entire stack and empties the operator stack', () => {

            const calc = new CalculatorModel();
            calc.appendToBuilder(2);
            calc.performOp('/');
            calc.appendToBuilder(3);
            calc.performOp('*');
            calc.appendToBuilder(2);
            calc.performOp('=');
            expect(calc.stack).toHaveLength(2);
            expect(calc.currentDisplay).toEqual('1.3333333333333333');
        });
        
    });

    describe('when there are multiple types of operations (e.g., add & mult or subtr & div)', () => {

        test('it evaluates the entire stack (add/subtr) and the number stack only contains the result', () => {

            const calc = new CalculatorModel();
            calc.appendToBuilder(1);
            // console.log(calc.stack, calc.operatorStack, calc.currentDisplay);
            calc.performOp('+');
            // console.log(calc.stack, calc.operatorStack, calc.currentDisplay);
            calc.appendToBuilder(2);
            // console.log(calc.stack, calc.operatorStack, calc.currentDisplay);
            calc.performOp('*');
            // console.log(calc.stack, calc.operatorStack, calc.currentDisplay);
            calc.appendToBuilder(3);
            // console.log(calc.stack, calc.operatorStack, calc.currentDisplay);
            calc.performOp('=');
            // console.log(calc.stack, calc.operatorStack, calc.currentDisplay);
            expect(calc.stack).toHaveLength(2);
            expect(calc.currentDisplay).toEqual('7');
        });

        test('it evaluates the entire stack (add/subtr) and the number stack only contains the result', () => {

            const calc = new CalculatorModel();
            calc.appendToBuilder(1);
            calc.performOp('-');
            calc.appendToBuilder(2);
            calc.performOp('/');
            calc.appendToBuilder(3);
            calc.performOp('=');
            expect(calc.stack).toHaveLength(2);
            expect(calc.currentDisplay).toEqual('0.33333333333333337');
        });

        test('it evaluates the entire stack (mult/div) and the number stack only contains the result', () => {

            const calc = new CalculatorModel();
            calc.appendToBuilder(1);
            calc.performOp('-');
            calc.appendToBuilder(2);
            calc.performOp('*');
            calc.appendToBuilder(3);
            calc.performOp('=');
            expect(calc.stack).toHaveLength(2);
            expect(calc.currentDisplay).toEqual('-5');
        });

        test('it evaluates the entire stack and correctly handles an operator being pressed first', () => {

            const calc = new CalculatorModel();
            calc.performOp('+');
            calc.appendToBuilder(2);
            calc.performOp('*');
            calc.appendToBuilder(3);
            calc.performOp('=');
            expect(calc.stack).toHaveLength(1);
            expect(calc.currentDisplay).toEqual('6');
        });

        test('it evaluates the entire stack and correctly handles an operator being pressed first', () => {

            const calc = new CalculatorModel();
            calc.performOp('*');
            calc.appendToBuilder(2);
            calc.performOp('*');
            calc.appendToBuilder(3);
            calc.performOp('=');
            expect(calc.stack).toHaveLength(1);
            expect(calc.currentDisplay).toEqual('0');
        });

        test('it evaluates the entire stack and correctly handles an operator being pressed first', () => {

            const calc = new CalculatorModel();
            calc.performOp('/');
            calc.appendToBuilder(2);
            calc.performOp('*');
            calc.appendToBuilder(3);
            calc.performOp('=');
            expect(calc.currentDisplay).toEqual('0');
        });
    });

    describe('if the button pressed after equals is a number', () => {
        test('it should reset the stacks', () => {
            const calc = new CalculatorModel();
            calc.performOp('+');
            calc.appendToBuilder(2);
            calc.performOp('*');
            calc.appendToBuilder(3);
            calc.performOp('=');
            calc.appendToBuilder(1);
            expect(calc.stack).toHaveLength(1);
            expect(calc.numberBuilder).toEqual('1');
            expect(calc.operatorStack).toHaveLength(0);
            expect(calc.currentDisplay).toEqual('1');
        });
    });

    describe('if the button pressed after equals is an operation', () => {
        test('it should continue calculations', () => {
            const calc = new CalculatorModel();
            calc.performOp('+');
            calc.appendToBuilder(2);
            calc.performOp('*');
            calc.appendToBuilder(3);
            calc.performOp('=');
            // console.log(calc.stack, calc.operatorStack, calc.currentDisplay);
            calc.performOp('*');
            // console.log(calc.stack, calc.operatorStack, calc.currentDisplay);
            calc.appendToBuilder(4);
            // console.log(calc.stack, calc.operatorStack, calc.currentDisplay);
            calc.performOp('=');
            calc.performOp('=');
            // console.log(calc.stack, calc.operatorStack, calc.currentDisplay);
            expect(calc.stack).toHaveLength(1);
            expect(calc.currentDisplay).toEqual('24');
        });
    });
});