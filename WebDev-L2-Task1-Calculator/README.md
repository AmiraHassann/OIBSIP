# Calculator

## Oasis Infobyte Internship
Level 2 – Task 1

## Project Overview
This project is a browser-based calculator built as part of the Oasis Infobyte Web Development & Designing internship. It provides a clean, responsive interface for performing basic arithmetic with a simple and readable user experience.

## Live Demo
[View the live demo](https://amirahassann.github.io/OIBSIP/WebDev-L2-Task1-Calculator/)

## Features
- Basic arithmetic operations
- Numbers 0–9
- Decimal numbers
- Expression display while typing
- Operator chaining
- Mathematical operator precedence
- Equals calculation
- Clear button
- Backspace/Delete
- Division-by-zero error handling
- Keyboard support
- Responsive design
- CSS Grid button layout
- Event listeners using Vanilla JavaScript
- No `eval()`

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript

## Project Structure
```text
WebDev-L2-Task1-Calculator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run
1. Clone or download the repository.
2. Open the project folder.
3. Open `index.html` in a web browser.

If you prefer, you can also run the project using VS Code Live Server.

## How It Works
Numbers are entered through the calculator buttons or keyboard and appended to the current input. Operators are stored as part of the full expression so the calculator can show the complete equation while typing. The full expression is evaluated only after pressing `=`.

Multiplication and division are processed before addition and subtraction to preserve mathematical precedence. If a division by zero is detected, the calculator stops the calculation and displays a clear error message.

## Internship Requirements Covered
- [x] Display
- [x] Numeric buttons
- [x] Decimal point
- [x] Arithmetic operators
- [x] Equals
- [x] Clear
- [x] Backspace/Delete
- [x] Division-by-zero prevention
- [x] Operator chaining
- [x] CSS Grid
- [x] addEventListener
- [x] No inline onclick
- [x] No eval()

## Author

**Amira AbdElhafeez** 

## Internship
Oasis Infobyte – Web Development & Designing
