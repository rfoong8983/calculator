class CalculatorModel {
    constructor() {
        this.stack = [0];
        this.operatorStack = [];
        this.currentDisplay = '0';
        this.lastInput = undefined;
        this.ops = {
            '+': true,
            '-': true,
            '*': true,
            '/': true,
            '=': true
        };
        this.utilities = {
            'AC': true
        };

        this.performOp = this.performOp.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }

    appendToLastNumber() {
        const lastNumOnStack = this.stack[this.stack.length - 1]
        // if (!this.lastInputIsOperation()) { .push('.'); }
        // this.currentDisplay.push('.');
    }

    addToStack(val) {
        if (this.lastInput === '=') this.stack = [0];
        this.stack.push(val);
        this.currentDisplay = val.toString();
        this.lastInput = val;
    }

    clearAll() {
        this.stack = [];
        this.operatorStack = [];
        this.currentDisplay = '0';
        this.lastInput = undefined;
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
                    this.lastInput = op;
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
                if (this.lastInputIsOperation()) {
                    break;
                }
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
        this.currentDisplay = result.toString();
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

    lastOpIsOperation() {
        const lastOp = this.getLastOperator();
        return lastOp in this.ops;
    }

    isDecimal(val) { return val === '.'; }
    isUtility(val) { return val in this.utilities; }
    isOperation(val) { return val in this.ops; }
    lastInputIsOperation() { return this.lastInput in this.ops; }
    lastOperationIsNotSameAs(val) { return this.lastInput !== val && this.lastInputIsOperation(); }
}

export default CalculatorModel;