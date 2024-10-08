const display = document.getElementById('display');
let currentExpression = '';
let isResultDisplayed = false; // To track if a result was displayed

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function () {
        const key = this.getAttribute('data-key');
        handleInput(key);
    });
});

document.addEventListener('keydown', function (event) {
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '.' || ['+', '-', '*', '/', '(', ')'].includes(key)) {
        handleInput(key);
    } else if (key === 'Enter') {
        handleInput('equal'); // Handle Enter key as 'equal'
    } else if (key === 'Backspace') {
        clearDisplay();
    }
});

function handleInput(key) {
    if (isResultDisplayed && key !== 'equal' && key !== 'clear') {
        // Reset expression if a result was displayed
        currentExpression = ''; // Clear current expression
        isResultDisplayed = false; // Reset the flag
    }

    if (key === 'equal') {
        calculateExpression();
    } else if (key === 'clear') {
        clearDisplay();
    } else {
        currentExpression += key; // Append the new input
        display.value = currentExpression; // Update the display
    }
}

function calculateExpression() {
    try {
        // Check for division by zero
        if (currentExpression.includes('/0')) {
            throw new Error("Division by zero error");
        }
        // Evaluate the expression
        const result = eval(currentExpression);
        if (result === undefined || result === null || isNaN(result)) {
            throw new Error("Invalid calculation");
        }
        display.value = result; // Display the result
        currentExpression = result.toString(); // Update the current expression to the result
        isResultDisplayed = true; // Set flag indicating result is shown
    } catch (error) {
        display.value = "Error"; // Show error message
        setTimeout(clearDisplay, 2000); // Automatically clear after 2 seconds
    }
}

function clearDisplay() {
    currentExpression = ''; // Reset the current expression
    display.value = ''; // Clear the display
    isResultDisplayed = false; // Reset the result displayed flag
}
