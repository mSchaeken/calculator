/* DATA AND QUERYSELECTORS */

let displayMain = document.querySelector('#current-number');
let displayHeader = document.querySelector('#previous-number');

//Store of operands and operators for calculations
let firstOperand = undefined;
let secondOperand = undefined;
let operator = undefined;
let result = undefined;

//Boolean to toggle whether or not a followup calculation is expected
let followUp = false;

let history = [];

/* FUNCTIONS */

function operate() {
    operator = this.id;
    operatorText = this.textContent;

    if (operator === 'evaluate' && secondOperand === undefined) {
        return
    }

    else if (firstOperand === undefined) {
        firstOperand = parseFloat(displayMain.textContent);
        displayHeader.textContent += `${displayMain.textContent} ${operatorText} `;
        displayMain.textContent = '';
    }

    else if (operator !== 'evaluate') {
        followUp = true;
        evaluate();
    }

    else {
        evaluate();
    };
};


function add(a = firstOperand, b = secondOperand) {
        result = a + b;
        return result;
};

function subtract(a = firstOperand, b = secondOperand) {
    result = a - b;
    return result
};

function multiply(a = firstOperand, b = secondOperand) {
    result = a * b;
    return result;
};

function divide(a = firstOperand, b = secondOperand) {
    if (secondOperand === 0) {
        clearAll()
        displayHeader.textContent = 'ERROR__1337: what is the meaning of life?'
        displayMain.textContent = '42'
    }
    
    else {
        result = a / b;
        return a / b;
    };
};

function evaluate() {
    secondOperand = parseFloat(displayMain.textContent);

    switch (operator) {
        case 'add':
            add();
            updateDisplay();
            break;
            
        case 'subtract':
            subtract()
            updateDisplay();
            break;
            
        case 'multiply':
            multiply()
            updateDisplay();
            break;
            
        case 'divide':
            divide()
            updateDisplay();
            break;
        };

    firstOperand = result;
    secondOperand = parseFloat(displayHeader.textContent);
};

function updateDisplay() {
    if (followUp === true) {
        displayHeader.textContent = `${result} ${operatorText}`;
        displayMain.textContent = '';
        followUp = false;
    }

    else {
        displayHeader.textContent = `${firstOperand} ${operatorText} ${secondOperand}`;
        displayMain.textContent = `${result}`;
        firstOperand = undefined;
        operator = 'evaluate';
    }
}

function enterNumber () {

    //Prevent adding multiple dots in display
    if (displayMain.textContent.includes('.') && this.textContent === '.') {
        return;
    }


    else if (operator === 'evaluate') {
        clearAll();
        displayMain.textContent = this.textContent;

    }

    else if (followUp === true ) {
        displayMain.textContent = '';
        displayMain.textContent += this.textContent;
    }

    else {
        displayMain.textContent += this.textContent;
    };
};

function backspace() {
    displayMain.textContent = displayMain.textContent.slice(0, -1);
}

function clearAll() {
    displayMain.textContent = displayMain.textContent.slice(-1, 0);
    displayHeader.textContent = displayHeader.textContent.slice(-1, 0);
    firstOperand = undefined;
    secondOperand = undefined;
    result = undefined;
    operator = undefined;
    followUp = false;
};

function addListeners() {
    const buttons = document.querySelectorAll('button');

    //Attach specific listeners to buttons based on their class
    buttons.forEach(button => {

        switch (button.className) {
            case 'operand':
                button.addEventListener('click', enterNumber);
                break;
            case 'operator':
                button.addEventListener('click', operate);
                break;
            case 'clear':
                button.addEventListener('click', clearAll);
                break;
            case 'backspace':
                button.addEventListener('click', backspace)
                break;
            case 'evaluate':
                button.addEventListener('click', evaluate)
        };
    });
};

window.onload = addListeners();