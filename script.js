// Get DOM elements
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");
const pointButton = document.querySelector(".point");
const percentageButton = document.querySelector(".percentage");
const plusMinusButton = document.querySelector(".plus-minus");
const calculatorOperation = document.querySelector(".calculator__operation");
const calculatorResult = document.querySelector(".calculator__result");

// These variables store the values ​​of operations
let currentNumber = "";
let previousNumber = "";
let operator = "";
let finalAnswer = "";
let answerDisplayed = false;

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

// Enabling and disabling buttons when dividing by zero
function disableButtons(boolean) {
  operatorButtons.forEach(
    (operatorButton) => (operatorButton.disabled = boolean)
  );
  pointButton.disabled = boolean;
  percentageButton.disabled = boolean;
  plusMinusButton.disabled = boolean;
}

// Resetting the calculator after dividing a number by zero
function resetCalculator() {
  currentNumber = "";
  previousNumber = "";
  operator = "";
  disableButtons(false);
  calculatorOperation.textContent = "";
  calculatorResult.textContent = 0;
}

// Rounding decimals to 10 digits
function roundingDecimal(decimalNumber) {
  return Math.round(decimalNumber * 10 ** 10) / 10 ** 10;
}

// Delete the last character of a string
function removeLastCharacter(string) {
  return string.slice(0, string.length - 1);
}

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", () => {
    // After getting the answer, if the user clicks on any number, a new calculation will start
    if (answerDisplayed) {
      currentNumber = "";
      answerDisplayed = false;
      operator = "";
      finalAnswer = "";

      // Enable buttons after division by zero
      disableButtons(false);
      calculatorOperation.textContent = "";
    }

    // The user cannot enter a number longer than 10 digits
    if (currentNumber.length < 10) {
      // Click on any number and it will display it in the calculator display area
      currentNumber += numberButton.textContent;
      calculatorResult.textContent = currentNumber;
    }
  });
});

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", () => {
    const previousOperator = operator;

    // Continuing the calculation on the answer
    if (answerDisplayed) {
      currentNumber = finalAnswer;
      operator = "";
      finalAnswer = "";
      answerDisplayed = false;
    }

    // If we have a decimal point at the end of any number, it will remove it
    if (currentNumber[currentNumber.length - 1] === ".") {
      currentNumber = removeLastCharacter(currentNumber);
      calculatorResult.textContent = currentNumber;
    }

    // If the user enters a number, they can edit the calculation operator if needed
    if (operator === "") {
      previousNumber = currentNumber;
      currentNumber = "";
    }

    // The operator cannot be used at the beginning of the calculation
    if (previousNumber !== "") {
      operator = operatorButton.textContent;
    }

    // The calculator only performs mathematical operations on one pair of numbers at a time
    if (currentNumber) {
      finalAnswer = calculate(
        Number(previousNumber),
        Number(currentNumber),
        previousOperator
      );
      previousNumber = finalAnswer;
      calculatorResult.textContent = finalAnswer;
      currentNumber = "";
    }

    calculatorOperation.textContent = `${previousNumber} ${operator}`;
  });
});

// Gets the answer and displays it
equalButton.addEventListener("click", () => {
  // If we have a decimal point at the end of any number, it will remove it
  if (currentNumber[currentNumber.length - 1] === ".") {
    currentNumber = removeLastCharacter(currentNumber);
  }

  // Preventing incorrect calculations when numbers are not entered completely and equal button is clicked
  if (currentNumber === "") {
    currentNumber = calculatorResult.textContent;
  }

  // When we click on equals, the calculator returns to normal mode from the result of division by zero
  if (calculatorResult.textContent === "Cannot devide by zero!") {
    resetCalculator();
    //If we divide a number by zero, it warns us and stops the calculation
  } else if (operator === "÷" && currentNumber === "0") {
    calculatorResult.textContent = "Cannot devide by zero!";
    disableButtons(true);
  } else {
    // Completes the calculatorOperation part
    calculatorOperation.textContent += ` ${currentNumber} ${equalButton.textContent}`;

    // If we click on equals after reaching the answer,
    // it will repeat the mathematical operation on the answer
    if (
      (finalAnswer && operator !== "") ||
      (finalAnswer === 0 && operator === "÷")
    ) {
      previousNumber = finalAnswer;

      calculatorOperation.textContent = `${previousNumber} ${operator} ${currentNumber} ${equalButton.textContent}`;
    }

    // If we click on the equal sign after writing the number, it will display the number itself
    if (
      operator === "" ||
      !calculatorOperation.textContent.includes(operator)
    ) {
      finalAnswer = currentNumber;
      calculatorOperation.textContent = `${currentNumber} =`;
      calculatorResult.textContent = currentNumber;
    } else {
      finalAnswer = calculate(
        Number(previousNumber),
        Number(currentNumber),
        operator
      );
      finalAnswer = roundingDecimal(finalAnswer);
      calculatorResult.textContent = finalAnswer;
    }
  }
  answerDisplayed = true;
});

// Resets all variables and clears the calculator screen
clearButton.addEventListener("click", () => {
  finalAnswer = "";
  answerDisplayed = false;
  resetCalculator();
});

backspaceButton.addEventListener("click", () => {
  // Remove calculatorOperation when we click backspace after getting the answer
  if (answerDisplayed) {
    calculatorOperation.textContent = "";
  }

  // When we click on backspace, the calculator returns to normal mode from the result of division by zero
  if (calculatorResult.textContent === "Cannot devide by zero!") {
    resetCalculator();
  }

  // User can undo their last input if they click the wrong number
  if (calculatorResult.textContent == currentNumber) {
    currentNumber = removeLastCharacter(currentNumber);
    if (currentNumber === "") {
      calculatorResult.textContent = 0;
    } else {
      calculatorResult.textContent = currentNumber;
    }
  }
});

pointButton.addEventListener("click", () => {
  // Click on the decimal point after getting the answer
  if (finalAnswer) {
    currentNumber = "";
    operator = "";
    finalAnswer = "";
    answerDisplayed = false;
    calculatorResult.textContent = currentNumber;
    calculatorOperation.textContent = "";
  }

  // Prevent multiple decimal points in numbers
  if (!currentNumber.includes(pointButton.textContent)) {
    // Clicking on the decimal point when a number is entered or vice versa
    if (currentNumber === "") {
      currentNumber = 0 + pointButton.textContent;
    } else {
      currentNumber += pointButton.textContent;
    }
    calculatorResult.textContent = currentNumber;
  }
});

percentageButton.addEventListener("click", () => {
  // Getting the percentage of the calculation answer
  if (answerDisplayed) {
    currentNumber = finalAnswer;
    calculatorOperation.textContent = "";
    answerDisplayed = false;
  }

  // Takes the percentage of the user input number
  if (currentNumber !== "") {
    currentNumber /= 100;
    currentNumber = roundingDecimal(currentNumber);
    calculatorResult.textContent = currentNumber;
  }
});

// Changes the sign of user input numbers and calculation results
plusMinusButton.addEventListener("click", () => {
  if (answerDisplayed) {
    finalAnswer *= -1;
    calculatorOperation.textContent = "";
    calculatorResult.textContent = finalAnswer;
  } else if (Number(currentNumber)) {
    currentNumber *= -1;
    calculatorResult.textContent = currentNumber;
  }
});
