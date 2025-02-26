// The following functions calculate 4 basic mathematical operations
function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function division(firstNumber, secondNumber) {
  return firstNumber / secondNumber;
}

// Solves mathematical operations and returns the result
function calculate(firstNumber, secondNumber, operator) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "×":
      return multiply(firstNumber, secondNumber);
    case "÷":
      return division(firstNumber, secondNumber);
  }
}

function display() {
  // Get DOM elements
  const numberButtons = document.querySelectorAll(".number");
  const operatorButtons = document.querySelectorAll(".operator");
  const equalButton = document.querySelector(".equal");
  const calculatorOperation = document.querySelector(".calculator__operation");
  const calculatorResult = document.querySelector(".calculator__result");

  // These variables store the values ​​of operations
  let currentNumber = "";
  let previousNumber = "";
  let operator = "";
  let finalAnswer = "";
  let answerDisplayed = false;

  numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", () => {
      // After getting the answer, if the user clicks on any number, a new calculation will start
      if (answerDisplayed === true) {
        currentNumber = "";
        answerDisplayed = false;
        operator = "";
        calculatorOperation.textContent = "";
      }

      // Click on any number and it will display it in the calculator display area
      currentNumber += numberButton.textContent;
      calculatorResult.textContent = currentNumber;
    });
  });

  operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
      // Continuing the calculation on the answer
      if (answerDisplayed === true) {
        currentNumber = finalAnswer;
        answerDisplayed = false;
        operator = "";
      }

      // If the user enters a number, they can edit the calculation operator if needed
      if (operator === "") {
        previousNumber = currentNumber;
        currentNumber = "";
      }

      // The operator cannot be used at the beginning of the calculation
      if (previousNumber !== "") {
        operator = operatorButton.textContent;
        calculatorOperation.textContent = `${previousNumber} ${operator}`;
      }
    });
  });

  // Gets the answer and displays it
  equalButton.addEventListener("click", () => {
    // Completes the calculatorOperation part
    calculatorOperation.textContent += ` ${currentNumber} ${equalButton.textContent}`;

    finalAnswer = calculate(
      Number(previousNumber),
      Number(currentNumber),
      operator
    );
    calculatorResult.textContent = finalAnswer;
    answerDisplayed = true;
  });
}

display();