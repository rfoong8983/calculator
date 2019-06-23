import CalculatorModel from '../components/calculator/calculator_model';

describe('adds values to a stack', () => {

    describe('when the value is a number', () => {

        test('it does not add a number to the operator stack', () => {
            const calc = new CalculatorModel();
            calc.addToStack('1');
            expect(calc.operatorStack).toHaveLength(0);
        });

        test('it does add a number to the number stack', () => {
            const calc = new CalculatorModel();
            calc.addToStack('1');
            expect(calc.stack).toHaveLength(1);
        });

        test('it updates current display', () => {
            const calc = new CalculatorModel();
            calc.addToStack(1);
            expect(calc.currentDisplay).toEqual(1);
        });
    });

    describe('when the value is an operator', () => {

        test('it does not add an operator to the number stack', () => {
            const calc = new CalculatorModel();
            calc.add();
            calc.subtract();
            calc.multiply();
            calc.divide();
            expect(calc.stack).toHaveLength(0);
        });

        test('it adds an operator to the operator stack if the last input was a number', () => {
            const calc = new CalculatorModel();
            calc.addToStack(1);
            calc.add();
            calc.addToStack(1);
            calc.multiply();
            expect(calc.operatorStack).toHaveLength(2);
        });

        test('it replaces the last operator if the last input was an operator', () => {
            const calc = new CalculatorModel();
            calc.add();
            calc.divide();
            calc.subtract();
            calc.multiply();
            expect(calc.operatorStack).toHaveLength(1);
        });

        test('it updates current display', () => {
            const calc = new CalculatorModel();
            calc.addToStack(1);
            calc.add();
            calc.addToStack(2);
            expect(calc.currentDisplay).toEqual(2);
        });

        describe('if there is an add operation on the operator stack', () => {

            test('add will evaluate the sum of the last two vals on the stack', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.add();
                calc.addToStack(2);
                calc.add();
                expect(calc.currentDisplay).toEqual(3);
            });

            test('subtract will evaluate the sum of the last two vals on the stack', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.add();
                calc.addToStack(2);
                calc.subtract();
                expect(calc.currentDisplay).toEqual(3);
            });

            test('multiply will display the last input', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.add();
                calc.addToStack(2);
                calc.multiply();
                expect(calc.currentDisplay).toEqual(2);
            });

            test('subtract will evaluate the sum of the last two vals on the stack', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.add();
                calc.addToStack(2);
                calc.divide();
                expect(calc.currentDisplay).toEqual(2);
            });
        })

        describe('if there is a subtract operation on the operator stack', () => {

            test('add will evaluate the sum of the last two vals on the stack', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.subtract();
                calc.addToStack(2);
                calc.add();
                expect(calc.currentDisplay).toEqual(-1);
            });

            test('subtract will evaluate the sum of the last two vals on the stack', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.subtract();
                calc.addToStack(2);
                calc.subtract();
                expect(calc.currentDisplay).toEqual(-1);
            });

            test('multiply will display the last input', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.subtract();
                calc.addToStack(2);
                calc.multiply();
                expect(calc.currentDisplay).toEqual(2);
            });

            test('divide will evaluate the sum of the last two vals on the stack', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.subtract();
                calc.addToStack(2);
                calc.divide();
                expect(calc.currentDisplay).toEqual(2);
            });
        });

        describe('if there is a multiply operation on the operator stack', () => {

            test('add will evaluate the rest of the stack', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.add();
                calc.addToStack(2);
                calc.multiply();
                calc.addToStack(3);
                calc.add();
                expect(calc.currentDisplay).toEqual(7);
            });

            test('subtract will evaluate the rest of the stack', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.subtract();
                calc.addToStack(2);
                calc.multiply();
                calc.addToStack(3);
                calc.subtract();
                expect(calc.currentDisplay).toEqual(-5);
            });

            test('multiply will display the last input', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.multiply();
                calc.addToStack(2);
                calc.multiply();
                expect(calc.currentDisplay).toEqual(2);
            });

            test('divide will evaluate the sum of the last two vals on the stack', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.multiply();
                calc.addToStack(2);
                calc.divide();
                expect(calc.currentDisplay).toEqual(2);
            });
        })

        describe('if there is a divide operation on the operator stack', () => {

            test('add will evaluate the last operation', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.divide();
                calc.addToStack(2);
                calc.add();
                expect(calc.currentDisplay).toEqual(0.5);
            });

            test('subtract will evaluate the last operation', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.divide();
                calc.addToStack(2);
                calc.subtract();
                expect(calc.currentDisplay).toEqual(0.5);
            });

            test('multiply will evaluate the the last operation', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.divide();
                calc.addToStack(2);
                calc.multiply();
                expect(calc.currentDisplay).toEqual(0.5);
            });

            test('divide will evaluate the last operation', () => {
                const calc = new CalculatorModel();
                calc.addToStack(1);
                calc.divide();
                calc.addToStack(2);
                calc.divide();
                expect(calc.currentDisplay).toEqual(0.5);
            });
        });
    });
});

describe('if the value is equals', () => {

    describe ('when there are single operations (e.g., add & subtr or mult & div)', () => {

        // test('it evaluates the entire stack (add/subtr) and the number stack only contains the result', () => {

        //     const calc = new CalculatorModel();
        //     calc.addToStack(1);
        //     calc.add();
        //     calc.addToStack(2);
        //     calc.multiply();
        //     calc.addToStack(3);
        //     calc.evalStack();
        //     expect(calc.stack).toHaveLength(1);
        // });

        // test('it evaluates the entire stack (mult/div) and the number stack only contains the result', () => {

        //     const calc = new CalculatorModel();
        //     calc.addToStack(1);
        //     calc.add();
        //     calc.addToStack(2);
        //     calc.multiply();
        //     calc.addToStack(3);
        //     calc.evalStack();
        //     expect(calc.stack).toHaveLength(1);
        // });
    });

    describe('when there are multiple operations (e.g., add & mult or subtr & div)', () => {

        // test('it evaluates the entire stack and the number stack only contains the result', () => {
            
        //     const calc = new CalculatorModel();
        //     calc.addToStack(1);
        //     calc.add();
        //     calc.addToStack(2);
        //     calc.multiply();
        //     calc.addToStack(3);
        //     calc.evalStack();
        //     expect(calc.stack).toHaveLength(1);
        // });

        // test('it evaluates the entire stack and empties the operator stack', () => {

        //     const calc = new CalculatorModel();
        //     calc.addToStack(1);
        //     calc.add();
        //     calc.addToStack(2);
        //     calc.multiply();
        //     calc.addToStack(3);
        //     calc.evalStack();
        //     expect(calc.operatorStack).toHaveLength(0);
        // });

        // test('it evaluates the entire stack and correctly handles addition', () => {

        //     const calc = new CalculatorModel();
        //     calc.addToStack(1);
        //     calc.add();
        //     calc.addToStack(2);
        //     calc.multiply();
        //     calc.addToStack(3);
        //     calc.evalStack();
        //     expect(calc.currentDisplay).toEqual(7);
        // });

        // test('it evaluates the entire stack and correctly calculates the value', () => {

        //     const calc = new CalculatorModel();
        //     calc.addToStack(1);
        //     calc.add();
        //     calc.addToStack(2);
        //     calc.multiply();
        //     calc.addToStack(3);
        //     calc.evalStack();
        //     expect(calc.currentDisplay).toEqual(7);
        // });
    });
});