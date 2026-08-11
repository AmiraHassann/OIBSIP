const historyDisplay = document.getElementById('history');
const resultDisplay = document.getElementById('result');
const errorDisplay = document.getElementById('error');
const buttons = document.querySelector('.buttons');

let currentInput = '0';
let expressionTokens = [];
let waitingForSecondOperand = false;
let justEvaluated = false;
let hasError = false;

function getOperatorSymbol(operator) {
	if (operator === '*') {
		return '×';
	}

	if (operator === '/') {
		return '÷';
	}

	if (operator === '-') {
		return '−';
	}

	return '+';
}

function isOperator(token) {
	return token === '+' || token === '-' || token === '*' || token === '/';
}

function formatNumber(value) {
	if (!Number.isFinite(value)) {
		return null;
	}

	const roundedValue = Number(value.toFixed(10));
	return String(roundedValue);
}

function tokensToText(tokens) {
	return tokens
		.map((token) => (isOperator(token) ? getOperatorSymbol(token) : token))
		.join(' ');
}

function buildHistoryText() {
	if (expressionTokens.length === 0) {
		return currentInput;
	}

	if (justEvaluated || waitingForSecondOperand) {
		return tokensToText(expressionTokens);
	}

	return `${tokensToText(expressionTokens)} ${currentInput}`;
}

function updateDisplay() {
	historyDisplay.textContent = buildHistoryText();
	resultDisplay.textContent = currentInput;
}

function showError(message) {
	hasError = true;
	errorDisplay.textContent = message;
	resultDisplay.textContent = 'Error';
}

function clearError() {
	hasError = false;
	errorDisplay.textContent = '';
}

function resetCalculator() {
	currentInput = '0';
	expressionTokens = [];
	waitingForSecondOperand = false;
	justEvaluated = false;
	clearError();
	updateDisplay();
}

function calculateExpression(tokens) {
	if (tokens.length === 0) {
		return '0';
	}

	const workingTokens = tokens.slice();

	for (let index = 0; index < workingTokens.length; index += 1) {
		if (!isOperator(workingTokens[index])) {
			continue;
		}

		const leftValue = Number(workingTokens[index - 1]);
		const rightValue = Number(workingTokens[index + 1]);

		if (!Number.isFinite(leftValue) || !Number.isFinite(rightValue)) {
			return null;
		}

		if (workingTokens[index] === '*') {
			const product = formatNumber(leftValue * rightValue);

			if (product === null) {
				return null;
			}

			workingTokens.splice(index - 1, 3, product);
			index -= 1;
			continue;
		}

		if (workingTokens[index] === '/') {
			if (rightValue === 0) {
				showError('Cannot divide by zero.');
				return null;
			}

			const quotient = formatNumber(leftValue / rightValue);

			if (quotient === null) {
				return null;
			}

			workingTokens.splice(index - 1, 3, quotient);
			index -= 1;
		}
	}

	let result = Number(workingTokens[0]);

	for (let index = 1; index < workingTokens.length; index += 2) {
		const operator = workingTokens[index];
		const nextValue = Number(workingTokens[index + 1]);

		if (!Number.isFinite(result) || !Number.isFinite(nextValue)) {
			return null;
		}

		if (operator === '+') {
			result += nextValue;
		} else if (operator === '-') {
			result -= nextValue;
		} else {
			return null;
		}
	}

	return formatNumber(result);
}

function appendNumber(number) {
	if (hasError) {
		resetCalculator();
	}

	if (justEvaluated) {
		currentInput = '0';
		expressionTokens = [];
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

		currentInput = currentInput === '0' ? '0.' : `${currentInput}.`;
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

	if (justEvaluated) {
		expressionTokens = [];
		justEvaluated = false;
	}

	if (expressionTokens.length === 0) {
		expressionTokens.push(currentInput, nextOperator);
		waitingForSecondOperand = true;
		currentInput = '0';
		updateDisplay();
		return;
	}

	if (waitingForSecondOperand) {
		expressionTokens[expressionTokens.length - 1] = nextOperator;
	} else {
		expressionTokens.push(currentInput, nextOperator);
		waitingForSecondOperand = true;
		currentInput = '0';
	}

	updateDisplay();
}

function handleEquals() {
	if (hasError || waitingForSecondOperand || justEvaluated) {
		return;
	}

	const tokensToEvaluate = expressionTokens.length === 0
		? [currentInput]
		: expressionTokens.concat(currentInput);
	const computedValue = calculateExpression(tokensToEvaluate);

	if (computedValue === null) {
		return;
	}

	currentInput = computedValue;
	expressionTokens = tokensToEvaluate;
	waitingForSecondOperand = false;
	justEvaluated = true;
	clearError();
	updateDisplay();
}

function handleDelete() {
	if (hasError) {
		resetCalculator();
		return;
	}

	if (justEvaluated) {
		return;
	}

	if (waitingForSecondOperand) {
		if (expressionTokens.length >= 2) {
			currentInput = expressionTokens[expressionTokens.length - 2];
			expressionTokens = expressionTokens.slice(0, -2);
		} else {
			currentInput = '0';
			expressionTokens = [];
		}

		waitingForSecondOperand = false;
		updateDisplay();
		return;
	}

	if (currentInput.length > 1) {
		currentInput = currentInput.slice(0, -1);

		if (currentInput === '-' || currentInput === '') {
			if (expressionTokens.length > 0) {
				currentInput = '0';
				waitingForSecondOperand = true;
			} else {
				currentInput = '0';
			}
		}
	} else {
		currentInput = '0';

		if (expressionTokens.length > 0) {
			waitingForSecondOperand = true;
		}
	}

	updateDisplay();
}

buttons.addEventListener('click', (event) => {
	const target = event.target;

	if (!(target instanceof HTMLButtonElement)) {
		return;
	}

	const { number, operator, action } = target.dataset;

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

	if (operator) {
		handleOperator(operator);
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
