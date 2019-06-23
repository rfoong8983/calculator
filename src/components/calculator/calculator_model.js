class CalculatorModel {
    constructor() {
        this.stack = [];
        this.operatorStack = [];
        this.currentDisplay = 0;
        this.lastInput = undefined;

        this.performOp = this.performOp.bind(this);
        // this.add = this.add.bind(this);
        // this.subtract = this.subtract.bind(this);
        // this.multiply = this.multiply.bind(this);
        // this.divide = this.divide.bind(this);
    }

    addToStack(val) {
        this.stack.push(val);
        this.currentDisplay = val;
        this.lastInput = val;
    }

    performOp(op) {

        switch(op) {

            case '+':
            case '-':
                if (this.lastOperationIsNotSameAs(op)) {
                    this.operatorStack.pop();
                    this.operatorStack.push(op);
                } else {
                    this.evalStack();
                    this.operatorStack.push(op);
                    this.lastInput = op;
                }

                break;

            case '*':
            case '/':
                if (this.lastOperationIsNotSameAs(op)) {
                    this.operatorStack.pop();
                    this.operatorStack.push(op);
                } else if (this.isMultOrDiv()) {
                    this.evalLastTwoNums();
                } else {
                    this.operatorStack.push(op);
                    this.lastInput = op;
                }

                break;

            case '=':
                this.evalStack();
                
            default:
                return;
        }
    }

    evalLastTwoNums() {
        const op = this.operatorStack.pop();
        let l;
        let r;
        let result;

        r = this.stack.pop();
        l = this.stack.pop();

        switch(op) {
            case '+':
                result = l + r;
                break;
            case '-':
                result = l - r;
                break;
            case '*':
                result = l * r;
                break;
            case '/':
                result = l / r;
                break;
            default:
                return;
        }

        this.stack.push(result);
        this.currentDisplay = result;
    }

    // helper functions

    evalStack() {
        while (this.stack.length && this.operatorStack.length) {
            this.evalLastTwoNums();
        }
    }

    getLastOperator() {
        if (this.operatorStack.length === 0) {
            return null;
        } else {
            return this.operatorStack[this.operatorStack.length - 1];
        }
    }

    isMultOrDiv() {
        const lastOp = this.getLastOperator();
        return lastOp === '*' || lastOp === '/';
    }

    isOperation(val) {
        const ops = {
            '+': true,
            '-': true,
            '*': true,
            '/': true
        };

        return val in ops;
    }

    lastInputIsOperation() {
        const ops = {
            '+': true,
            '-': true,
            '*': true,
            '/': true
        };

        return this.lastInput in ops;
    }

    lastOperationIsNotSameAs(val) {
        return this.lastInput !== val && this.lastInputIsOperation();
    }
}

export default CalculatorModel;


    // remember to check operation VS input in certain cases

    // add() {
    //     if (this.lastOperationIsNotSameAs('+')) {
    //         this.operatorStack.pop();
    //         this.operatorStack.push('+');
    //     } else {
    //         this.evalStack();
    //         this.operatorStack.push('+');
    //         this.lastInput = '+';
    //     }
    // }

    // subtract() {
    //     if (this.lastOperationIsNotSameAs('-')) {
    //         this.operatorStack.pop();
    //         this.operatorStack.push('-');
    //     } else {
    //         this.evalStack();
    //         this.operatorStack.push('-');
    //         this.lastInput = '-';
    //     }


    // }

    // multiply() {
    //     if (this.lastOperationIsNotSameAs('*')) {
    //         this.operatorStack.pop();
    //         this.operatorStack.push('*');
    //     } else if (this.isMultOrDiv()) {
    //         this.evalLastTwoNums();
    //     } else {
    //         this.operatorStack.push('*');
    //         this.lastInput = '*';
    //     }

    // }

    // divide() {
    //     if (this.lastOperationIsNotSameAs('/')) {
    //         this.operatorStack.pop();
    //         this.operatorStack.push('/');
    //     } else if (this.isMultOrDiv()) {
    //         this.evalLastTwoNums();
    //     } else {
    //         this.operatorStack.push('/');
    //         this.lastInput = '/';
    //     }

    // }