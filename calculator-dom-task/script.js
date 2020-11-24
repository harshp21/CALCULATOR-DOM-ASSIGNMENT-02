let calculatorContainer = document.createElement('div');
calculatorContainer.setAttribute('class', 'calculator-container');

let calDisplay = document.createElement('div');
calDisplay.setAttribute('class', 'calculator-display');

let display = document.createElement('div');
display.setAttribute('class', 'display-output');

calDisplay.append(display);

let calNumPadContainer = document.createElement('div');
calNumPadContainer.setAttribute('class', 'calculator-numpad-container');


let calNumPadOptions = document.createElement('div');
calNumPadOptions.setAttribute('class', 'cal-numpad-options');

let numOne = calNumPadOptions.cloneNode(true);
numOne.innerText = "1";

numOne.addEventListener('click', function () {
    display.innerText = display.innerText + '1';
    updateExpression();
})

let numTwo = calNumPadOptions.cloneNode(true);
numTwo.innerText = "2";

numTwo.addEventListener('click', function () {
    display.innerText = display.innerText + '2';
    updateExpression();
})

let numThree = calNumPadOptions.cloneNode(true);
numThree.innerText = "3";

numThree.addEventListener('click', function () {
    display.innerText = display.innerText + '3';
    updateExpression();
})

let numFour = calNumPadOptions.cloneNode(true);
numFour.innerText = "4";

numFour.addEventListener('click', function () {
    display.innerText = display.innerText + '4';
    updateExpression();
})

let numFive = calNumPadOptions.cloneNode(true);
numFive.innerText = "5";

numFive.addEventListener('click', function () {
    display.innerText = display.innerText + '5';
    updateExpression();
})

let numSix = calNumPadOptions.cloneNode(true);
numSix.innerText = "6";

numSix.addEventListener('click', function () {
    display.innerText = display.innerText + '6';
    updateExpression();
})

let numSeven = calNumPadOptions.cloneNode(true);
numSeven.innerText = "7";

numSeven.addEventListener('click', function () {
    display.innerText = display.innerText + '7';
    updateExpression();
})

let numEight = calNumPadOptions.cloneNode(true);
numEight.innerText = "8";

numEight.addEventListener('click', function () {
    display.innerText = display.innerText + '8';
    updateExpression();
})

let numNine = calNumPadOptions.cloneNode(true);
numNine.innerText = "9";

numNine.addEventListener('click', function () {
    display.innerText = display.innerText + '9';
    updateExpression();
})

let numZero = calNumPadOptions.cloneNode(true);
numZero.innerText = "0";

numZero.addEventListener('click', function () {
    display.innerText = display.innerText + '0';
    updateExpression();
})

let calNumPadTaskOptions = document.createElement('div');
calNumPadTaskOptions.setAttribute('class', 'cal-numpad-options numpad-task');


let divide = calNumPadTaskOptions.cloneNode(true);
divide.innerText = '/';

divide.addEventListener('click', function () {
    if (display.innerText !== '') {
        updateDisplay(evaluate());
        updateTask('/');
    }
})

let multiply = calNumPadTaskOptions.cloneNode(true);
multiply.innerText = 'x';

multiply.addEventListener('click', function () {
    if (display.innerText !== '') {
        updateDisplay(evaluate());
        updateTask('x');
    }
})

let add = calNumPadTaskOptions.cloneNode(true);
add.innerText = '+';

add.addEventListener('click', function () {
    if (display.innerText !== '') {
        updateDisplay(evaluate());
        updateTask('+');
    }
})

let substract = calNumPadTaskOptions.cloneNode(true);
substract.innerText = '-';

substract.addEventListener('click', function () {
    if (display.innerText !== '') {
        updateDisplay(evaluate());
        updateTask('-');
    }
})

let equals = document.createElement('div');
equals.setAttribute('class', 'cal-numpad-options equals-task');

equals.innerText = '=';

equals.addEventListener('click', function () {
    if (display.innerText !== '') {
        updateExpression();
        updateDisplay(evaluate());
    }
})

let del = calNumPadOptions.cloneNode(true);
del.innerText = 'del';

del.addEventListener('click', function () {
    deleteNumber();
})

let clear = calNumPadOptions.cloneNode(true);
clear.innerText = 'clear';

clear.addEventListener('click', function () {
    clearTask();
})

let mPlus = calNumPadOptions.cloneNode(true);
mPlus.innerText = 'M+';

mPlus.addEventListener('click', function () {
    if (display.innerText !== '') {
        addItemToLocalStorage(display.innerText);
        alert('Added to Memory');
    }
})

let mMinus = calNumPadOptions.cloneNode(true);
mMinus.innerText = 'M-';

mMinus.addEventListener('click', function () {
    retriveResultFromLocalStorage();
    alert('Removed from Memory');
})

let mClear = calNumPadOptions.cloneNode(true);
mClear.innerText = 'MC';

mClear.addEventListener('click', function () {
    if (localStorage.getItem("results") !== null) {
        clearLocalStorage();
        alert('Cleared Memory');
    }
})

calNumPadContainer.append(mPlus, mMinus, mClear, divide);
calNumPadContainer.append(numSeven, numEight, numNine, multiply);
calNumPadContainer.append(numFour, numFive, numSix, add);
calNumPadContainer.append(numOne, numTwo, numThree, substract);
calNumPadContainer.append(numZero, clear, del, equals);


calculatorContainer.append(calDisplay, calNumPadContainer);
document.body.append(calculatorContainer);

let expression = '';
let tasks = ['+', '-', 'x', '/'];
let results = [];

function clearTask() {
    display.innerText = '';
    expression = '';
}


function updateTask(task) {
    let str = display.innerText;
    let substring = str.substring(str.length - 1, str.length);
    if (!tasks.includes(substring)) {
        expression = display.innerText + task;
        display.innerText = display.innerText + task;
    }

}

function updateDisplay(num) {
    display.innerText = num;
}

function updateExpression() {
    expression = display.innerText;
}

function getExpressionToEvaluate() {
    let num = '';
    let exp = [];
    for (let char of expression) {
        if (tasks.includes(char)) {
            exp.push(num);
            exp.push(char);
            num = '';
        } else {
            num = num + char;
        }
    }
    exp.push(num);
    return exp;
}

function deleteNumber() {
    let str = display.innerText;
    display.innerText = str.substring(0, str.length - 1);
}

function evaluate() {
    let exp = getExpressionToEvaluate();
    if (tasks.includes(exp[exp.length - 1]) || exp[exp.length - 1] === '') {
        return expression;
    } else {
        let sum = 0;
        if (exp.length >= 3) {
            let num1 = exp.shift();
            while (exp.length !== 0) {
                task = exp.shift();
                num2 = exp.shift();
                sum = calculate(task, num1, num2);
                num1 = sum;
            }
            return sum;
        }
        return expression;
    }

}

function calculate(task, num1, num2) {
    switch (task) {
        case '+':
            return parseInt(num1) + parseInt(num2);
            break;
        case '-':
            return parseInt(num1) - parseInt(num2);
            break;
        case '/':
            return parseInt(num1) / parseInt(num2);
            break;
        case 'x':
            return parseInt(num1) * parseInt(num2);
            break;
        default:
            return 0;
    }
}


function addItemToLocalStorage(item) {
    results.push(item);
    localStorage.setItem('results', results);
}

function retriveResultFromLocalStorage() {
    let res = localStorage.getItem('results');
    if (res !== undefined) {
        let items = res.split(",");
        display.innerText = items.pop();
        localStorage.setItem('results', items);
    }
}

function clearLocalStorage() {
    localStorage.clear();
}
