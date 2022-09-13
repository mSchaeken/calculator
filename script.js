/* DATA AND QUERYSELECTORS */

let displayMain = document.querySelector('#current-number');
let displayHeader = document.querySelector('#previous-number');

let firstOperand = undefined;
let secondOperand = undefined;
let operator = undefined;
let result = undefined;

let history = [];

/* FUNCTIONS */

function operate() {

    //Prevent function from doing anything if the first chosen operator is '='
    if (this.id === 'evaluate' && operator === undefined) {
        return;
    }

    else if (firstOperand === undefined) {
        operator = this.id;
        operatorText = this.textContent
        firstOperand = parseFloat(displayMain.textContent);
        displayHeader.textContent += `${displayMain.textContent} ${operatorText} `;
        displayMain.textContent = '';
    }

    else {
        secondOperand = parseFloat(displayMain.textContent);
        
        switch (operator) {
            case 'add':
                processResults(add());
        };

        operator = this.id;
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
    displayHeader.textContent = `${firstOperand} ${operatorText} ${secondOperand} `;
    displayMain.textContent = `${calculationResult}`;
                firstOperand = calculationResult;
                secondOperand = undefined;
}

function clearNumber() {

    //Clear either entire displayMain or last entry based on ID of button
    switch (this.id) {
        case 'backspace':
            displayMain.textContent = displayMain.textContent.slice(0, -1);
            operator = undefined;
            break;

        case 'all-clear':
            displayMain.textContent = displayMain.textContent.slice(-1, 0);
            displayHeader.textContent = displayHeader.textContent.slice(-1, 0);
            firstOperand = undefined;
            secondOperand = undefined;
            operator = undefined;
            break;
    };
};

function enterNumber () {

    //Prevent adding multiple dots in display
    if (displayMain.textContent.includes('.') && this.textContent === '.') {
        return;
    }

    else {
        displayMain.textContent += this.textContent;
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