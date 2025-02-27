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
  const clearButton = document.querySelector(".clear");
  const backspaceButton = document.querySelector(".backspace");
  const pointButton = document.querySelector(".point");
  const percentageButton = document.querySelector(".percentage");
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

        // Enable buttons after division by zero
        operatorButtons.forEach(
          (operatorButton) => (operatorButton.disabled = false)
        );
        pointButton.disabled = false;
        percentageButton.disabled = false;

        // Returns the font of the calculationResult field to normal
        calculatorResult.classList.remove("calculator__result--small");
        calculatorOperation.textContent = "";
      }

      // Click on any number and it will display it in the calculator display area
      currentNumber += numberButton.textContent;
      calculatorResult.textContent = currentNumber;
    });
  });

  operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
      const previousOperator = operator;

      // Continuing the calculation on the answer
      if (answerDisplayed === true) {
        currentNumber = finalAnswer;
        answerDisplayed = false;
        operator = "";
      }

      // If we have a decimal point at the end of any number, it will remove it
      if (currentNumber[currentNumber.length - 1] === ".") {
        currentNumber = currentNumber.slice(0, currentNumber.length - 1);
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
      currentNumber = currentNumber.slice(0, currentNumber.length - 1);
    }

    // Preventing incorrect calculations when numbers are not entered completely and equal button is clicked
    if (currentNumber === "") {
      currentNumber = calculatorResult.textContent;
    }

    // When we click on equals, the calculator returns to normal mode from the result of division by zero
    if (calculatorResult.textContent === "Cannot devide by zero!") {
      currentNumber = "";
      previousNumber = "";
      operator = "";
      operatorButtons.forEach(
        (operatorButton) => (operatorButton.disabled = false)
      );
      pointButton.disabled = false;
      percentageButton.disabled = false;
      calculatorResult.classList.remove("calculator__result--small");
      calculatorOperation.textContent = "";
      calculatorResult.textContent = 0;

      //If we divide a number by zero, it warns us and stops the calculation
    } else if (operator === "÷" && currentNumber === "0") {
      calculatorResult.classList.add("calculator__result--small");
      calculatorResult.textContent = "Cannot devide by zero!";

      operatorButtons.forEach(
        (operatorButton) => (operatorButton.disabled = true)
      );
      pointButton.disabled = true;
      percentageButton.disabled = true;
    } else {
      // Completes the calculatorOperation part
      calculatorOperation.textContent += ` ${currentNumber} ${equalButton.textContent}`;

      // If we click on equals after reaching the answer,
      // it will repeat the mathematical operation on the answer
      if (finalAnswer && operator !== "") {
        previousNumber = finalAnswer;

        calculatorOperation.textContent = `${previousNumber} ${operator} ${currentNumber} ${equalButton.textContent}`;

        finalAnswer = calculate(
          Number(previousNumber),
          Number(currentNumber),
          operator
        );
      }

      // If we click on the equal sign after writing the number, it will display the number itself
      if (
        operator === "" ||
        !calculatorOperation.textContent.includes(operator)
      ) {
        calculatorResult.textContent = currentNumber;
      } else {
        finalAnswer = calculate(
          Number(previousNumber),
          Number(currentNumber),
          operator
        );
        calculatorResult.textContent = finalAnswer;
      }
    }
    answerDisplayed = true;
  });

  // Resets all variables and clears the calculator screen
  clearButton.addEventListener("click", () => {
    currentNumber = "";
    previousNumber = "";
    operator = "";
    finalAnswer = "";
    answerDisplayed = false;
    operatorButtons.forEach(
      (operatorButton) => (operatorButton.disabled = false)
    );
    pointButton.disabled = false;
    percentageButton.disabled = false;
    calculatorResult.classList.remove("calculator__result--small");
    calculatorOperation.textContent = "";
    calculatorResult.textContent = 0;
  });

  backspaceButton.addEventListener("click", () => {
    // Remove calculatorOperation when we click backspace after getting the answer
    if (calculatorResult.textContent == finalAnswer) {
      calculatorOperation.textContent = "";
    }

    // When we click on backspace, the calculator returns to normal mode from the result of division by zero
    if (calculatorResult.textContent === "Cannot devide by zero!") {
      currentNumber = "";
      previousNumber = "";
      operator = "";
      operatorButtons.forEach(
        (operatorButton) => (operatorButton.disabled = false)
      );
      pointButton.disabled = false;
      percentageButton.disabled = false;
      calculatorResult.classList.remove("calculator__result--small");
      calculatorOperation.textContent = "";
      calculatorResult.textContent = 0;
    }

    // User can undo their last input if they click the wrong number
    if (calculatorResult.textContent == currentNumber) {
      currentNumber = currentNumber.slice(0, currentNumber.length - 1);
      if (currentNumber === "") {
        calculatorResult.textContent = 0;
      } else {
        calculatorResult.textContent = currentNumber;
      }
    }
  });

  pointButton.addEventListener("click", () => {
    // Prevent multiple decimal points in numbers
    if (!currentNumber.includes(pointButton.textContent)) {
      // Click on the decimal point after getting the answer
      if (finalAnswer) {
        currentNumber = "";
        calculatorResult.textContent = currentNumber;
        calculatorOperation.textContent = "";
      }

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
    }

    // Takes the percentage of the user input number
    if (currentNumber !== "") {
      currentNumber = currentNumber / 100;
      calculatorResult.textContent = currentNumber;
    }
  });
}

display();
