document.addEventListener('DOMContentLoaded', () => {
    const expression = document.getElementById('expression');
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('.sci-btn');

    let currentExpression = '';
    let currentResult = '0';
    let memory = 0;
    let lastOperation = '';
    let newNumberStart = true;

    const updateDisplay = () => {
        expression.textContent = currentExpression;
        result.textContent = currentResult;
    };

    const clearAll = () => {
        currentExpression = '';
        currentResult = '0';
        lastOperation = '';
        newNumberStart = true;
        updateDisplay();
    };

    const calculate = (operation, value) => {
        const num = parseFloat(currentResult);
        switch (operation) {
            case 'sin':
                return Math.sin(num * Math.PI / 180);
            case 'cos':
                return Math.cos(num * Math.PI / 180);
            case 'tan':
                return Math.tan(num * Math.PI / 180);
            case 'log':
                return Math.log10(num);
            case 'ln':
                return Math.log(num);
            case 'square':
                return num * num;
            case 'cube':
                return num * num * num;
            case 'sqrt':
                return Math.sqrt(num);
            case 'factorial':
                if (num < 0) return 'Error';
                let fact = 1;
                for (let i = 2; i <= num; i++) fact *= i;
                return fact;
            case 'reciprocal':
                return 1 / num;
            case 'percent':
                return num / 100;
            case 'power':
                return Math.pow(num, value || 2);
            default:
                return num;
        }
    };

    const evaluateExpression = (expr) => {
        try {
            // Replace mathematical constants
            expr = expr.replace(/π/g, Math.PI).replace(/e/g, Math.E);
            // Safely evaluate the expression
            return Function('"use strict";return (' + expr + ')')();
        } catch (error) {
            return 'Error';
        }
    };

    const handleNumber = (value) => {
        if (newNumberStart) {
            currentResult = value;
            newNumberStart = false;
        } else {
            currentResult = currentResult === '0' ? value : currentResult + value;
        }
        updateDisplay();
    };

    const handleOperator = (operator) => {
        const operators = {
            'add': '+',
            'subtract': '-',
            'multiply': '×',
            'divide': '÷',
            'pi': 'π',
            'e': 'e'
        };

        if (operators[operator]) {
            currentExpression += currentResult + ' ' + operators[operator] + ' ';
            newNumberStart = true;
            updateDisplay();
        }
    };

    const handleEquals = () => {
        if (currentExpression) {
            let finalExpression = currentExpression + currentResult;
            finalExpression = finalExpression.replace(/×/g, '*').replace(/÷/g, '/');
            const result = evaluateExpression(finalExpression);
            currentExpression = '';
            currentResult = result.toString();
            newNumberStart = true;
            updateDisplay();
        }
    };

    const handleFunction = (func) => {
        const num = parseFloat(currentResult);
        if (!isNaN(num)) {
            const result = calculate(func);
            currentResult = result.toString();
            newNumberStart = true;
            updateDisplay();
        }
    };

    const handleMemory = (action) => {
        const num = parseFloat(currentResult);
        switch (action) {
            case 'mc':
                memory = 0;
                break;
            case 'mr':
                currentResult = memory.toString();
                newNumberStart = true;
                break;
            case 'm-plus':
                memory += num;
                break;
            case 'm-minus':
                memory -= num;
                break;
        }
        updateDisplay();
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            const value = button.dataset.value;

            if (value) {
                handleNumber(value);
            } else if (action === 'clear') {
                clearAll();
            } else if (action === 'equals') {
                handleEquals();
            } else if (['mc', 'mr', 'm-plus', 'm-minus'].includes(action)) {
                handleMemory(action);
            } else if (['add', 'subtract', 'multiply', 'divide', 'pi', 'e'].includes(action)) {
                handleOperator(action);
            } else {
                handleFunction(action);
            }
        });
    });

    // Handle keyboard input
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (/[0-9.]/.test(key)) {
            handleNumber(key);
        } else if (key === '+') {
            handleOperator('add');
        } else if (key === '-') {
            handleOperator('subtract');
        } else if (key === '*') {
            handleOperator('multiply');
        } else if (key === '/') {
            handleOperator('divide');
        } else if (key === 'Enter' || key === '=') {
            handleEquals();
        } else if (key === 'Escape') {
            clearAll();
        }
    });

    // Initial display update
    updateDisplay();
}); 