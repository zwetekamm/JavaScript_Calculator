// assigns num1, num2, ... num0
function assignNumberVariables(x) {	
	var id = num + x;
	var num = document.getElementById('id');
	num = id;
}
for (let i = 0; i < 10; i++) {
	assignNumberVariables(i);
}

var clear = document.getElementById('clear');
var sign = document.getElementById('sign');
var backspace = document.getElementById('backspace');
var decimal = document.getElementById('decimal');

var viewer = document.getElementById('viewer');
var viewerValue = '0';
var storedValue;
var stringArray = [];

var getNumbers = document.getElementsByClassName('num');
var getOperators = document.getElementsByClassName('operator');

// Updates the viewer to display number after button click
var updateViewer = (clickObj) => {
	var text = clickObj.target.innerText;

	if (viewerValue === '0') {
		viewerValue = '';
	}

	viewerValue += text;
	viewer.innerText = viewerValue;
}

// Calculates addition, subtraction, multiplication, and division using string
function calculate (operand) {
	storedValue = viewerValue;
	viewerValue = '0';
	viewer.innerText = viewerValue;
	stringArray.push(storedValue);
	stringArray.push(operand);
}

var calcOperation = (clickObj) => {
	var operator = clickObj.target.innerText;

	switch (operator) {
		case '+':
			calculate('+');
			break;

		case '-':
			calculate('-');
			break;

		case 'x':
			calculate('*');
			break;

		case '/':
			calculate('/');
			break;

		case '=':
			stringArray.push(viewerValue);
			var result = eval(stringArray.join(' '));
			viewerValue = result + '';
			viewer.innerText = viewerValue;
			stringArray = [];

		default:
			break;
	}
}

for (let i = 0; i < getNumbers.length; i++) {
	getNumbers[i].addEventListener('click', updateViewer, false);
}

for (let i = 0; i < getOperators.length; i++) {
	getOperators[i].addEventListener('click', calcOperation, false);
}

clear.onclick = () => {
	viewerValue = '0';
	storedValue = '';
	stringArray = [];
	viewer.innerHTML = viewerValue;
}

// Uses slice to remove last character of viewer
backspace.onclick = () => {
	var length = viewerValue.length;
	viewerValue = viewerValue.slice(0, length - 1);

	if (viewerValue === '') {
		viewerValue = '0';
	}
	viewer.innerText = viewerValue;
}

// Converts to positive or negative sign within the viewer string
sign.onclick = () => {
	if (viewerValue != '0') {
		if (viewerValue.includes('-')) {
			viewerValue = viewerValue.replace('-', '');
		} else {
			viewerValue = '-' + viewerValue;
		}
		viewer.innerText = viewerValue;
	}
}

// Allows only 1 decimal to exist in number string
decimal.onclick = () => {
	if (!viewerValue.includes('.')) {
		viewerValue += '.';
	}
	viewer.innerText = viewerValue;
}