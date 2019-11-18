// JavaScript implementation of the Luhn algorithm
// Part of this implementation was adopted from https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-80.php


// DOM selection of UI components
let numberInput = document.getElementById("numberInput");
let checkBtn = document.getElementById("checkBtn");
let displayInfo = document.getElementById("displayInfo");

// The Luhn Algorithm Function based on the Luhn Algorithm Formula
const luhnAlgorithmValidator = () => {
  // Collecting the value of user input and storing it in a variable
  let userEntry = numberInput.value;

  // Replace all spaces using regular expression
  let trimSpaces = userEntry.replace(/ /gi, '');

  // Converting the resulting value to integers and getting rid of whitespaces
  let userInput = parseInt(trimSpaces, 10);

  // Converting the resulting integers to array and calling required array methods on it
  let stringUserInput = (userInput + '')
    .split('')
    .reverse()
    .map(x => parseInt(x));

  // Removing the rightmost digit and storing the returned value in a variable as number.
  let lastDigit = stringUserInput.splice(0, 1)[0];

  // Iterating through the remaining elements in the array
  // Adding the elements of the array to the accumulator parameter and storing in the totalInputScore variable
  let totalInputScore = stringUserInput.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);

  // Adding the rightmost digit to the total score
  totalInputScore += lastDigit;

  // Return a boolean: true for valid user input and false for invalid user input
  return totalInputScore % 10 === 0;
};


// Validating userinput upon click event by the user
const validate = (userInput) => {

  let notification = displayInfo.style.backgroundColor = "whitesmoke";
  
  userInput = numberInput.value.length;

  // checks for no entry by the user
  if ( userInput == ' ' ) {
    displayInfo.textContent = "Please enter a number";
  }
  
  // checks if the entry contains alphabets or symbols
  else if ( /[A-Za-z-!$%^&*£()_+|~=`{}\[\]:";'<>?,.\/]/.test(numberInput.value) ) {
    displayInfo.textContent = "Non-digit characters are not allowed";  
  }
  
  // checks if the length of entry is 1
  else if ( Number(userInput)  == 1 ) {
    displayInfo.textContent = "Single digit is not allowed";   
  }
  // validates a correct number entry
  else if ( luhnAlgorithmValidator() === true ) {
    displayInfo.textContent = "Number is valid.";
  } 
  // validates a correct number entry
  else if ( luhnAlgorithmValidator() === false ) {
    displayInfo.textContent = "Number is NOT valid.";
  }
}

// listens for a click event on the validate button and fires the luhnAlgorithmValidator function
checkBtn.addEventListener("click", validate);