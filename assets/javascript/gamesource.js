// source for psychic guessing game
// written by Joe Frew

// this is a guessing game that asks the player to try and guess the letter that has been selected by the computer by
// pressing a key on their keyboard. if the correct key is pressed, the player wins. if the incorrect key is pressed
// the player loses one of their ten guess chances and is able to select another. when the user runs out of guesses
// he loses the game. under the hood, the computer rolls for a number between 97 and 122, which corresponds with a 
// lowercase letter on the ASCII value table. it takes that number compares it to the player's selection, which is 
// taken as a letter and converted to its ASCII numberical value. if the game finds these numbers are the same, the
// player wins. if they aren't the same, the game checks to see if that letter has already been guessed. if it has, 
// it is ignored. if it has not, it is added to the 'wrong answers' array. when the player wins or loses, the game is
// reset so that it can be played again. score is kept for posterity. 

var pWins = 0;
var pLoss = 0;
var pGuess = 10;
var wrongGuess = [];

// function selects random integer within a range 
// pulled from https://gist.github.com/alfredwesterveld/8864936
// written by Alfred Westerveld
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
	// getRandomInt pulls a number between 97-122 which is used to pull corresponding ASCII.
    var y = getRandomInt(97, 122);
    var cpuLetter = String.fromCharCode(y);

    document.onkeyup = function(event) {
        // init variables.
        var guesses = document.getElementById("guesses");
        var wrongLetters = document.getElementById("wrongLetters");
        var wins = document.getElementById("wins");
        var losses = document.getElementById("losses");

        // listens for player choice and converts it to ASCII table value.
        var pLetter = event.key.toLowerCase();
        var asciiSelected = pLetter.charCodeAt(0);

        // is the reported keypress a single letter that hasn't been guessed yet? if so, continue, if not, ignore it.
        if (pLetter.length == 1 && (asciiSelected >= 97 && asciiSelected <= 122)) {

        	// if the player guesses correctly, game ends, number of wins incremented by 1, game calls for restart
        	// and the game restarts.
            if (cpuLetter === pLetter) {
                pWins++;
                wins.textContent = "Wins: " + pWins;
                restartGame();
            } else {

                // checks to make sure the letter the player has pressed hasn't been guessed yet by searching wrongGuess 
                // array.
                // if the letter is unique, guesses decrements and the character is added to the wrongGuess array.
                if (wrongGuess.indexOf(pLetter) === -1) {
                    pGuess--;
                    guesses.textContent = "Remaining Guesses: " + pGuess;
                    wrongGuess.push(pLetter);
                    wrongLetters.textContent = "Incorrect Guesses: " + wrongGuess.join(", ").toUpperCase();
                }
            }
            // when guesses remaining = 0, loss counter incremented by 1 and call to restart game
            if (pGuess === 0) {
                pLoss++;
                losses.textContent = "Losses: " + pLoss;
                restartGame();
            }
        }
    }
}

// initializes game.
startGame();

// clears the old game and resets all (non score) fields to original state.
function restartGame() {
    pGuess = 10;
    wrongGuess.length = 0;
    guesses.textContent = "Remaining Guesses: " + pGuess;
    wrongLetters.textContent = "Incorrect Guesses: " + wrongGuess;
    startGame();
}