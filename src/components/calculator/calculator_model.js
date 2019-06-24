class CalculatorModel {
    constructor() {
        this.stack = [0];
        this.numberBuilder = '';
        this.operatorStack = [];
        this.currentDisplay = '0';
        this.lastInput = undefined;
        this.ops = {
            '+': true,
            '-': true,
            '*': true,
            '/': true
        };
        this.utilities = {
            'AC': true
        };

        this.performOp = this.performOp.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }

    appendToBuilder(val) {
        if (this.limitNumberOfDigits()) return;
        this.resetStackAfterEquals();
        if (this.preventMultipleDecimals(val)) return;
        if (this.preventMultipleZeros(val)) return;

        if (this.replaceFirstZero(val)) {
            this.numberBuilder = val;
        } else {
            this.numberBuilder = this.numberBuilder.concat(val);
        }
        
        this.currentDisplay = this.numberBuilder;
        this.lastInput = val;
    }

    addToStack(val) {
        this.stack.push(val);
        this.currentDisplay = val.toString();
        this.lastInput = val;
    }

    clearAll() {
        this.stack = [];
        this.operatorStack = [];
        this.currentDisplay = '0';
        this.numberBuilder = '';
        this.lastInput = undefined;
    }

    performOp(op) {
        this.buildNumber();

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

            case 'Enter':
            case '=':
                if (this.lastInputIsOperation()) {
                    this.operatorStack.pop();
                    this.operatorStack.push(op);
                    this.lastInput = op;
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

    buildNumber() {
        const builtNumber = this.numberBuilder;
        
        if (builtNumber === '.') {
            if (this.stack[0] !== 0) this.stack.push(0);
        } else if (this.validNumberBuilder()) {
            this.stack.push(parseFloat(builtNumber));
        }

        this.numberBuilder = '';
    }

    validNumberBuilder() {
        if (!this.numberBuilder.length) return false;
        return true;
    }

    invalidDecimal() {
        const lastChar = this.getLastCharacter();
        if (lastChar === '.' || this.numberBuilder.includes('.')) {
            return true;
        }
    }

    limitNumberOfDigits() {
        if (this.numberBuilder.length === 18) {
            return true;
        } else {
            return false;
        }
    }

    preventMultipleDecimals(val) {
        const lastChar = this.getLastCharacter();
        if ((lastChar === '.' || this.numberBuilder.includes('.')) && val === '.') {
            return true;
        } else {
            return false;
        }
    }

    resetStackAfterEquals() {
        if (this.lastInput === '=') this.stack = [0];
    }

    getLastCharacter() {
        let lastIdx = 0;
        if (this.numberBuilder.length) {
            lastIdx = this.numberBuilder.length - 1;
        }
        return this.numberBuilder[lastIdx];
    }

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

    preventMultipleZeros(val) {
        const len = this.numberBuilder.length;
        const lastChar = this.getLastCharacter();

        if (val === '0' && len === 1 && lastChar === '0') {
            return true;
        } else {
            return false;
        }
    }

    replaceFirstZero(val) {
        const len = this.numberBuilder.length;
        const lastChar = this.getLastCharacter();
        const validNums = {
            // does not include 0
            '1': true, '2': true, '3': true,
            '4': true, '5': true, '6': true,
            '7': true, '8': true, '9': true
        }
        
        if (val in validNums && len === 1 && lastChar === '0') {
            return true;
        } 
    }

    isNumber(val) {
        // created so handleKeyPress only accepts numbers
        const nums = {
            '1': true, '2': true, '3': true, 
            '4': true, '5': true, '6': true, 
            '7': true, '8': true, '9': true, '0': true
        }

        return val in nums;
    }
    isDecimal(val) { return val === '.'; }
    isUtility(val) { return val in this.utilities; }
    isOperation(val) { return val in this.ops; }
    isEquals(val) { return val === '=' || val === 'Enter'; } // split out from operations for calc logic
    lastInputIsOperation() { return this.lastInput in this.ops; }
    lastOperationIsNotSameAs(val) { return this.lastInput !== val && this.lastInputIsOperation(); }
}

export default CalculatorModel;