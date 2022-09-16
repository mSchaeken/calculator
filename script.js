/* DATA AND QUERYSELECTORS */

const displayMain = document.querySelector('#current-number');
const displayHeader = document.querySelector('#previous-number');
const historyLogContainer = document.querySelector('.history-log-container');

//Store of operands and operators for calculations
let firstOperand = undefined;
let secondOperand = undefined;
let operator = undefined;
let result = undefined;

//Boolean to toggle whether or not a followup calculation is expected
let followUp = false;

/* FUNCTIONS */

function add(a = firstOperand, b = secondOperand) {
    result = Math.round(((a + b) + Number.EPSILON) * 100000) / 100000;
};

function subtract(a = firstOperand, b = secondOperand) {
    result = Math.round(((a - b) + Number.EPSILON) * 100000) / 100000;
};

function multiply(a = firstOperand, b = secondOperand) {
    result = Math.round(((a * b) + Number.EPSILON) * 100000) / 100000;
};

function divide(a = firstOperand, b = secondOperand) {
    result = Math.round(((a / b) + Number.EPSILON) * 100000) / 100000;
};

function validate() {
    operatorText = this.textContent;

    if (operator === 'evaluate' && secondOperand === undefined || operator === 'evaluate' && firstOperand === undefined ) {
        return;    

    } else if (firstOperand === undefined) {
        operator = this.id;
        firstOperand = parseFloat(displayMain.textContent);
        displayHeader.textContent += `${displayMain.textContent} ${operatorText} `;
        displayMain.textContent = '';

    } else if (operator !== 'evaluate') {
        followUp = true;
        operate();
        operator = this.id;

    } else {
        operate();
        operator = this.id;
    };
};

function operate() {
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
            if (secondOperand === 0) {
                clearAll()
                displayHeader.textContent = 'Divided by 0'
                displayMain.textContent = 'Self-destruct in 10... 9... 8...'
                operator = 'evaluate'
            } else {
                divide()
                updateDisplay();
                break;
            };
    };

    // firstOperand = result;
    secondOperand = parseFloat(displayHeader.textContent);
};

function updateDisplay() {
    if (followUp === true) {
        firstOperand = result;
        updateHistory();
        displayHeader.textContent = `${result} ${operatorText}`;
        displayMain.textContent = '';
        operator = undefined;
        followUp = false;

    } else {
        updateHistory();
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
    //Clear display if the last chosen operator was evaluate (equals-button)
    else if (operator === 'evaluate') {
        clearAll();
        displayMain.textContent = this.textContent;

    } else {
        displayMain.textContent += this.textContent;
    };
};

function backspace() {
    //Clear just last entry in display unless calculation was just completed using evaluate
    if (operator !== 'evaluate') {
        displayMain.textContent = displayMain.textContent.slice(0, -1);
    } else {
        clearAll();
    }
}

function clearAll() {
    displayMain.textContent = displayMain.textContent.slice(-1, 0);
    displayHeader.textContent = displayHeader.textContent.slice(-1, 0);
    resetValues();
};

function resetValues() {
    firstOperand = undefined;
    secondOperand = undefined;
    result = undefined;
    operator = undefined;
    followUp = false;
};

function updateHistory() {
    const historyParagraph = document.createElement('p');
    historyParagraph.className = 'history-entry';
    historyParagraph.textContent = `${displayHeader.textContent} ${displayMain.textContent} = ${result}`;

    const entryCount = document.querySelectorAll('.history-entry');
    if (entryCount.length >= 9) {
        historyLogContainer.removeChild(historyLogContainer.firstChild);
    };

    historyLogContainer.appendChild(historyParagraph);
}

function deleteHistory() {
    const entries = document.querySelectorAll('.history-entry');
    let entryCount = entries.length;
    while (entryCount >= 1) {
        historyLogContainer.removeChild(historyLogContainer.firstChild);
        entryCount--;
    };
}

function addListeners() {
    const buttons = document.querySelectorAll('button');

    //Attach specific listeners to buttons based on their class
    buttons.forEach(button => {

        switch (button.className) {
            case 'operand':
                button.addEventListener('click', enterNumber);
                break;
            case 'separator':
                button.addEventListener('click', enterNumber);
                break;  
            case 'operator':
                button.addEventListener('click', validate);
                break;
            case 'clear':
                button.addEventListener('click', clearAll);
                break;
            case 'backspace':
                button.addEventListener('click', backspace);
                break;
            case 'evaluate':
                button.addEventListener('click', operate);
                break;
            case 'delete-history':
                button.addEventListener('click', deleteHistory);
                break;
        };
    });
};

window.onload = addListeners();