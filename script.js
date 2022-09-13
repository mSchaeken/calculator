/* DATA AND QUERYSELECTORS */

const display = document.querySelector('#number-display');

let firstOperand = undefined;
let secondOperand = undefined;
let operator = undefined;
let result = undefined;
let clearDisplay = false;

let history = [];

/* FUNCTIONS */

function operate() {

    //Set first operand value if it hasn´t been set before
    if (firstOperand === undefined) {
        firstOperand = parseFloat(display.textContent);
        operator = this.id;
        display.textContent += ` ${this.textContent} `;
    }

    else {
        secondOperand = parseFloat(display.textContent);
        
        switch (operator) {
            case 'add':
                display.textContent = ` ${this.textContent}`
                processResults(add());
        };
    };
 };


function add(a = firstOperand, b = secondOperand) {
        return a + b;
};

function subtract(a = firstOperand, b = secondOperand) {
    return a - b;
};

function multiply(a = firstOperand, b = secondOperand) {
    return a * b;
};

function divide(a = firstOperand, b = secondOperand) {
    return a / b;
};

function processResults(calculationResult) {
    display.textContent = `${calculationResult}`;
                firstOperand = calculationResult;
                secondOperand = undefined;
                operator = undefined;
                clearDisplay = true;
}

function clearNumber() {

    //Clear either entire display or last entry based on ID of button
    switch (this.id) {
        case 'backspace':
            display.textContent = display.textContent.slice(0, -1);
            operator = undefined;
            break;

        case 'all-clear':
            display.textContent = display.textContent.slice(-1, 0);
            firstOperand = undefined;
            secondOperand = undefined;
            operator = undefined;
            break;
    };
};

function enterNumber () {

    //Conditional to prevent adding multiple dots in display and clear display
    if (display.textContent.includes('.') && this.textContent === '.') {
        return;
    }

    else {
        display.textContent += this.textContent;
    };
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
                button.addEventListener('click', clearNumber);
                break;
        };
    });
};

window.onload = addListeners();