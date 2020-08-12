import { puzzlesAndSolutions } from './puzzle-strings.js';

const textArea = document.getElementById('text-input');
let original, answer;

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple random puzzle into the text area
  original = Math.floor(Math.random() * 5);
  answer = puzzlesAndSolutions[original][1];
  original = puzzlesAndSolutions[original][0];
  textArea.value = original;
  addToGrid();
});

/**
	@method isValidNumber
	@param {any} input A value to be verified
	Verifies if the input is a valid number betwwen 1 and 9
	@returns {boolean}
*/
function isValidNumber(input){
	return !isNaN(input) && Number(input) > 0 && Number(input) < 10;
}

/**
	@method validateTextArea
	Verifies if the textArea's length is different form 81 
	and if it posses different a character than "." or a number except 0.
	If one of these conditions are true, then an error message will be shown
*/
window.validateTextArea = () => {
	let value = textArea.value;
	let div = document.getElementById('error-msg');
	div.innerHTML = "";
	if(value.length != 81){
		div.innerHTML = "Error: Expected puzzle to be 81 characters long.";
	}else if(!/^([1-9]|\.)+$/g.test(value)){
		div.innerHTML = "Error: A non allowed character was detected.";
	}
}

/**
	@method addToGrid
	checks for changes in the textArea, adding the new numbers to the grid
*/
window.addToGrid = () => {
	let area = textArea.value;
	for(let i = 0; i < area.length; i++){
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
			matrix.value = area[i];
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
	if(isValidNumber(elem.value)){
		let position = ((id[0].charCodeAt(0) - 65) * 9) + Number(id[1]) - 1;
		textArea.value = textArea.value.substring(0, position) + value + textArea.value.substring(position + 1);
	}else {
		elem.value = "";
	}
}

/**
	@method clearButton
	Restores the grid and textArea to their original values
*/
window.clearButton = () => {
	textArea.value = original;
 	addToGrid();
}

/**
	@method solveButton
	Updates the grid and textArea with the solution to the problem
*/
window.solveButton = () => {
	textArea.value = answer;
 	addToGrid();
}

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
  	validateTextArea: validateTextArea(),
  	addToGrid: addToGrid(),
  	validateNumber: validateNumber(id, value),
  	clearButton: clearButton(),
	solveButton: solveButton()
  }
} catch (e) {}
