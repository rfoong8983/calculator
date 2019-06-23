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
        const ops = {
            '+': true,
            '-': true,
            '*': true,
            '/': true
        };

        return this.lastInput !== val && this.lastInput in ops;
    }

    lastOperationIsSameAs(val) {
        const lastOp = this.getLastOperator();

        return lastOp === val;
    } // needs to be last operation is same as; NOT last input is same as

    lastInputIsSameAs(val) {
        return this.lastInput !== val;
    }

    add() {
        if (this.lastOperationIsNotSameAs('+')) {
            this.operatorStack.pop();
            this.operatorStack.push('+');
        } else if (this.isMultOrDiv() || this.lastOperationIsSameAs('+')) {
            this.evalStack();
        } else {
            this.operatorStack.push('+');
            this.lastInput = '+';
        }
    }

    subtract() {
        if (this.lastInputIsOperation() && this.lastOperationIsNotSameAs('-')) {
            this.operatorStack.pop();
            this.operatorStack.push('-');
        } else if (this.isMultOrDiv()) {
            this.evalStack();
        } else {
            this.operatorStack.push('-');
            this.lastInput = '-';
        }

        
    }

    multiply() {
        if (this.lastInputIsOperation() && this.lastOperationIsNotSameAs('*')) {
            this.operatorStack.pop();
            this.operatorStack.push('*');
        } else if (this.isMultOrDiv()) {
            this.equals();
        } else {
            this.operatorStack.push('*');
            this.lastInput = '*';
        }
        
    }

    divide() {
        if (this.lastInputIsOperation() && this.lastOperationIsNotSameAs('/')) {
            this.operatorStack.pop();
            this.operatorStack.push('/');
        }else if (this.isMultOrDiv()) {
            this.equals();
        } else {
            this.operatorStack.push('/');
            this.lastInput = '/';
        }
        
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