import { puzzlesAndSolutions } from './puzzle-strings.js';

const textArea = document.getElementById('text-input');
let original, answer;

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple random puzzle into the text area
  original = Math.floor(Math.random() * 5);
  answer = puzzlesAndSolutions[original][1];
  original = puzzlesAndSolutions[original][0];
  textArea.value = original;
  window.addToGrid();
});

/**
	@method isValidNumber
	@param {any} input A value to be verified
	Verifies if the input is a valid number betwwen 1 and 9
	@returns {boolean}
*/
window.isValidNumber = (input) => {
	return !isNaN(input) && Number(input) > 0 && Number(input) < 10;
}


/**
	@method findError
	Verifies if the textArea's length is different form 81 
	and if it posses different a character than "." or a number except 0.
	If one of these conditions are true, then an error message will be shown
*/
window.findError = () => {
	let value = textArea.value;
	if(value.length != 81){
		return "Error: Expected puzzle to be 81 characters long.";
	}else if(!/^([1-9]|\.)+$/g.test(value)){
		return "Error: A non allowed character was detected.";
	}else {
		return "";
	}
}

/**
	@method validateTextArea
	Sets the error message to the div
*/
window.validateTextArea = () => {
	let div = document.getElementById('error-msg');
	div.innerHTML = window.findError();
}

/**
  @method setInput
  @param {string} input Optional puzzle string
  Adds an input to the textArea
*/
window.setInput = (input) => {
  textArea.value = input;
  original = input;
  for(let i = 0; i < puzzlesAndSolutions.length; i++){
    if(puzzlesAndSolutions[i][0] == input){
        answer = puzzlesAndSolutions[i][1];
    }    
  }
  window.addToGrid();
}

/**
  @method getGridPosition
  @param {string} position Id of the grid to find
  @returns {number} value on the position
*/
window.getGridPosition = (position) => {
  return document.getElementById(position).value;
}

/**
	@method addToGrid
	checks for changes in the textArea, adding the new numbers to the grid
*/
window.addToGrid = () => {
  window.validateTextArea();
  let area = textArea.value;
	for(let i = 0; i < 81; i++){
		let position = Math.floor(i/9);
		let matrix;
		switch(position){
			case 0:
				matrix = "A";
				break;
			case 1:
				matrix = "B";
				break;
			case 2:
				matrix = "C";
				break;
			case 3:
				matrix = "D";
				break;
			case 4:
				matrix = "E";
				break;
			case 5:
				matrix = "F";
				break;
			case 6:
				matrix = "G";
				break;
			case 7:
				matrix = "H";
				break;
			default:
				matrix = "I";
		}
		matrix += ((i % 9) + 1);
		matrix = document.getElementById(matrix);
		if(!isNaN(area[i]) && Number(area[i]) > 0){
			matrix.value = area[i] || "";
		}else{
			matrix.value = "";
		}
	}
}

/**
	@method validateNumber
	@param {string} id Input grid id
	@param {string} value Inserted character into the grid
	Validates that the inserted value into the grid is a number between 1 and 9
	And inserts it in the textArea if its valid
*/
window.validateNumber = (id, value) => {
	let elem = document.getElementById(id);
  let position = ((id[0].charCodeAt(0) - 65) * 9) + Number(id[1]) - 1;
	if(!window.isValidNumber(elem.value)){
		elem.value = "";
    value = ".";
	}
  textArea.value = textArea.value.substring(0, position) + value + textArea.value.substring(position + 1);
  document.getElementById("text-input").value = textArea.value;
}

/**
	@method clearButton
	Restores the grid and textArea to their original values
*/
window.clearButton = () => {
	textArea.value = original;
  document.getElementById("text-input").value = textArea.value;
 	window.addToGrid();
}

/**
	@method solveButton
	Updates the grid and textArea with the solution to the problem
*/
window.solveButton = () => {
	textArea.value = answer;
  document.getElementById("text-input").value = textArea.value;
 	window.addToGrid();
}

/**
	@method checkSolution
	@param {string} input A given solution
  checks if the given solution is is right
*/
window.checkSolution = (input) => {
  //check on each row
  for(let i = 0; i < 81; i = i + 9){
    let set = new Set();
    for(let j = i; j < i + 9; j++){
      set.add(input[j]);
    }
    if(set.size < 9){
      return false;
    }
  }
  //check on each column
  for(let i = 0; i < 9; i++){
    let set = new Set();
    for(let j = i; j < 81; j = j + 9){
      set.add(input[j]);
    }
    if(set.size < 9){
      return false;
    }
  }
  //check on each square
  for(let i = 0; i < 81; i = i + 3){
    let set = new Set([input[i], input[i+1], 
      input[i+2], input[i+9], input[i+10], 
      input[i+11], input[i+18], input[i+19], input[i+20]]);
    if(set.size < 9){
      return false;
    }    
    i = i == 6 ? 24 : (i == 33 ? 51 : (i == 60 ? 78: i));
  }
  return true;
}

/**
	@method compare
	@param {string} input A given solution
  checks if the given input matches a solution
*/
window.compare = (input) => {
  for(let i = 0; i < puzzlesAndSolutions.length; i++){
   if(puzzlesAndSolutions[i][0] == input){
     return puzzlesAndSolutions[i][1];
   }
  }
  return false;
}

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    setInput: window.setInput,
    getGridPosition: window.getGridPosition,
    isValidNumber: window.isValidNumber,
    findError: window.findError,
  	validateTextArea: window.validateTextArea,
  	addToGrid: window.addToGrid,
  	validateNumber: window.validateNumber,
    checkSolution: window.checkSolution,
    compare: window.compare,
  	clearButton: window.clearButton,
  	solveButton: window.solveButton
  }
} catch (e) {
}
