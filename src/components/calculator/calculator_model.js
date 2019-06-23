class CalculatorModel {
    constructor() {
        this.stack = [];
        this.operatorStack = [];
        this.currentDisplay = 0;
        this.lastInput = undefined;

        this.add = this.add.bind(this);
        this.subtract = this.subtract.bind(this);
        this.multiply = this.multiply.bind(this);
        this.divide = this.divide.bind(this);
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

    evalStack() {
        while (this.stack.length && this.operatorStack.length) {
            this.equals();
        }
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

    add() {
        if (this.isOperation(this.lastInput) && this.lastInput !== '+') {
            this.operatorStack.pop();
            this.operatorStack.push('+');
        } else if (this.isMultOrDiv() || this.lastInput === '+') {
            this.evalStack();
        } else {
            this.operatorStack.push('+');
        }

        this.lastInput = '+';
    }

    subtract() {
        if (this.isOperation(this.lastInput) && this.lastInput !== '-') {
            this.operatorStack.pop();
            this.operatorStack.push('-');
        } else if (this.isMultOrDiv()) {
            this.evalStack();
        } else {
            this.operatorStack.push('-');
        }

        this.lastInput = '-';
    }

    multiply() {
        if (this.isOperation(this.lastInput) && this.lastInput !== '*') {
            this.operatorStack.pop();
            this.operatorStack.push('*');
        } else if (this.isMultOrDiv()) {
            this.equals();
        } else {
            this.operatorStack.push('*');
        }
        this.lastInput = '*';
    }

    divide() {
        if (this.isOperation(this.lastInput) && this.lastInput !== '/') {
            this.operatorStack.pop();
            this.operatorStack.push('/');
        }else if (this.isMultOrDiv()) {
            this.equals();
        } else {
            this.operatorStack.push('/');
        }
        this.lastInput = '/';
    }

    addToStack(val) {
        this.stack.push(val);
        this.currentDisplay = val;
        this.lastInput = val;
    }

    equals() {
        const op = this.operatorStack.pop();
        let l;
        let r;
        let result;

        r = this.stack.pop();
        l = this.stack.pop();

        if (op === '+') {
            result = l + r;
        } else if (op === '-') {
            result = l - r;
        } else if (op === '*') {
            result = l * r;
        } else if (op === '/') {
            result = l / r;
        }

        this.stack.push(result);
        this.currentDisplay = result;
    }
}

export default CalculatorModel;