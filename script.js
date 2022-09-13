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

};

function enterNumber () {

};


function addListeners() {
    const buttons = document.querySelectorAll('button');
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