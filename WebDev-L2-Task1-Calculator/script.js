const historyDisplay = document.getElementById('history');
const resultDisplay = document.getElementById('result');
const errorDisplay = document.getElementById('error');
const buttons = document.querySelector('.buttons');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let justEvaluated = false;
let hasError = false;

function updateDisplay() {
	resultDisplay.textContent = currentInput;

	if (firstOperand !== null && operator !== null) {
		historyDisplay.textContent = `${firstOperand} ${getOperatorSymbol(operator)}`;
	} else {
		historyDisplay.innerHTML = '&nbsp;';
	}
}

function showError(message) {
	hasError = true;
	errorDisplay.textContent = message;
	historyDisplay.innerHTML = '&nbsp;';
	resultDisplay.textContent = 'Error';
}

function clearError() {
	hasError = false;
	errorDisplay.textContent = '';
}

function resetCalculator() {
	currentInput = '0';
	firstOperand = null;
	operator = null;
	waitingForSecondOperand = false;
	justEvaluated = false;
	clearError();
	updateDisplay();
}

function getOperatorSymbol(value) {
	if (value === '*') {
		return '×';
	}

	if (value === '/') {
		return '÷';
	}

	if (value === '-') {
		return '−';
	}

	return '+';
}

function calculate(a, selectedOperator, b) {
	const left = Number(a);
	const right = Number(b);

	if (selectedOperator === '/' && right === 0) {
		showError('Cannot divide by zero.');
		return null;
	}

	let result;

	switch (selectedOperator) {
		case '+':
			result = left + right;
			break;
		case '-':
			result = left - right;
			break;
		case '*':
			result = left * right;
			break;
		case '/':
			result = left / right;
			break;
		default:
			result = right;
	}

	return formatResult(result);
}

function formatResult(value) {
	if (!Number.isFinite(value)) {
		showError('Calculation produced an invalid result.');
		return null;
	}

	const rounded = Number(value.toFixed(10));
	return String(rounded);
}

function appendNumber(number) {
	if (hasError) {
		resetCalculator();
	}

	if (justEvaluated && operator === null) {
		currentInput = '0';
		firstOperand = null;
		justEvaluated = false;
	}

	if (waitingForSecondOperand) {
		currentInput = '0';
		waitingForSecondOperand = false;
	}

	if (number === '.') {
		if (currentInput.includes('.')) {
			return;
		}

		currentInput = `${currentInput}.`;
		updateDisplay();
		return;
	}

	if (currentInput === '0') {
		currentInput = number;
	} else {
		currentInput += number;
	}

	updateDisplay();
}

function handleOperator(nextOperator) {
	if (hasError) {
		return;
	}

	if (waitingForSecondOperand && operator !== null) {
		operator = nextOperator;
		updateDisplay();
		return;
	}

	if (firstOperand !== null && operator !== null) {
		const computedValue = calculate(firstOperand, operator, currentInput);

		if (hasError || computedValue === null) {
			return;
		}

		firstOperand = computedValue;
		currentInput = computedValue;
	} else {
		firstOperand = currentInput;
	}

	operator = nextOperator;
	waitingForSecondOperand = true;
	justEvaluated = false;
	updateDisplay();
}

function handleEquals() {
	if (hasError || firstOperand === null || operator === null) {
		return;
	}

	const computedValue = calculate(firstOperand, operator, currentInput);

	if (hasError || computedValue === null) {
		return;
	}

	currentInput = computedValue;
	firstOperand = null;
	operator = null;
	waitingForSecondOperand = false;
	justEvaluated = true;
	historyDisplay.innerHTML = '&nbsp;';
	updateDisplay();
}

function handleDelete() {
	if (hasError) {
		resetCalculator();
		return;
	}

	if (waitingForSecondOperand || justEvaluated) {
		return;
	}

	if (currentInput.length <= 1) {
		currentInput = '0';
	} else {
		currentInput = currentInput.slice(0, -1);
	}

	updateDisplay();
}

buttons.addEventListener('click', (event) => {
	const target = event.target;

	if (!(target instanceof HTMLButtonElement)) {
		return;
	}

	const { number, operator: selectedOperator, action } = target.dataset;

	if (number !== undefined) {
		appendNumber(number);
		clearError();
		return;
	}

	if (action === 'clear') {
		resetCalculator();
		return;
	}

	if (action === 'delete') {
		handleDelete();
		return;
	}

	if (action === 'calculate') {
		handleEquals();
		return;
	}

	if (selectedOperator) {
		handleOperator(selectedOperator);
	}
});

document.addEventListener('keydown', (event) => {
	const { key } = event;

	if (/^[0-9]$/.test(key)) {
		appendNumber(key);
		clearError();
		return;
	}

	if (key === '.') {
		appendNumber('.');
		clearError();
		return;
	}

	if (key === '+' || key === '-' || key === '*' || key === '/') {
		handleOperator(key);
		return;
	}

	if (key === 'Enter' || key === '=') {
		event.preventDefault();
		handleEquals();
		return;
	}

	if (key === 'Backspace') {
		handleDelete();
		return;
	}

	if (key === 'Escape') {
		resetCalculator();
	}
});

updateDisplay();
