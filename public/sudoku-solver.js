const textArea = document.getElementById('text-input');
// import { puzzlesAndSolutions } from './puzzle-strings.js';

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
  addToGrid();
});

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

window.clearButton = () => {
	console.log("clearing");
}

window.solveButton = () => {
	console.log("solve");
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
  	clearButton: clearButton(),
	solveButton: solveButton()
  }
} catch (e) {}
