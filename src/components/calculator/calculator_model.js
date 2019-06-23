class CalculatorModel {
    constructor() {
        this.stack = [0];
        this.operatorStack = [];
        this.currentDisplay = 0;
        this.lastInput = undefined;

        this.performOp = this.performOp.bind(this);
    }

    addToStack(val) {
        if (this.lastInput === '=') this.stack = [0];
        this.stack.push(val);
        this.currentDisplay = val;
        this.lastInput = val;
    }

    performOp(op) {
        switch(op) {

            case '+':
            case '-':
                if (this.lastInputIsOperation()) {
                    this.operatorStack.pop();
                    this.operatorStack.push(op);
                } else {
                    this.lastInput = op;
                    this.evalStack();
                    this.operatorStack.push(op);
                }

                break;

            case '*':
            case '/':
                if (this.lastInputIsOperation()) {
                    this.operatorStack.pop();
                    this.operatorStack.push(op);
                } else if (this.lastOpWasMultOrDiv()) {
                    this.evalLastTwoNums();

                    if (this.lastInput !== op) {
                        this.operatorStack.push(op);
                        this.lastInput = op;
                    }
                } else {
                    this.lastInput = op;
                    this.operatorStack.push(op);
                }

                break;

            case '=':
                this.evalStack();
                this.lastInput = '=';
                break;
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
                result = (l / r);
                break;
            default:
                return;
        }

        this.addToStack(result);
        this.currentDisplay = result;
    }

    // helper functions

    evalStack() {
        while (this.stack.length > 1 && this.operatorStack.length) {
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

    lastOpWasMultOrDiv() {
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

    lastOpIsOperation() {
        const lastOp = this.getLastOperator();

        const ops = {
            '+': true,
            '-': true,
            '*': true,
            '/': true
        };

        return lastOp in ops;
    }

    lastOperationIsNotSameAs(val) {
        return this.lastInput !== val && this.lastInputIsOperation();
    }
}

export default CalculatorModel;