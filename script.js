/* FUNCTIONS */

function operate() {

};

function add() {

};

function subtract() {

};

function multiply() {

};

function divide() {

};

function clearNumber () {
    const display = document.querySelector('#number-display');

    //Clear either entire display or last entry based on ID of button
    switch (this.id) {
        case 'backspace':
            display.textContent = display.textContent.slice(0, -1);
            break;
        case 'all-clear':
            display.textContent = display.textContent.slice(-1, 0);
            break;
    };

};

function enterNumber () {
    const display = document.querySelector('#number-display');
    display.textContent += this.textContent;
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