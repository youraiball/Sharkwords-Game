const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the letters in `word` and create divs.
// The divs should be appended to the section with id="word-container".
//
// Use the following template string to create each div:
// `<div class="letter-box ${letter}"></div>`
//
const createDivsForChars = (word) => {
  const wordContainer = document.querySelector("#word-container")
  for (const char of word){
    wordContainer.insertAdjacentHTML("beforeend", `<div class="letter-box ${char}"></div>`)
  }
};

// Loop over each letter in the alphabet and generate a button for each letter
// The buttons should be appended to the section with id="letter-buttons".

// <!-- beforebegin -->
// <p>
//   <!-- afterbegin -->
//   foo
//   <!-- beforeend -->
// </p>
// <!-- afterend -->  w

const generateLetterButtons = () => {
  const letterButton = document.querySelector("#letter-buttons")
  for (const letter of ALPHABET){
    letterButton.insertAdjacentHTML("beforeend", `<button>${letter}</button>`)
  }
};

// Set the `disabled` property of `buttonEl` to true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true
};

// This is a helper function we will use in the future
// It should return `true` if `letter` is in the word
// For now, you should test it out to make sure it works

const isLetterInWord = (letter, word) => {
  if (word.includes(letter)){
    return true
  } else {
    return false
  }
};

// Called when `letter` is in word. Update contents of divs with `letter`.

const handleCorrectGuess = (letter) => {
  const blanks = document.querySelectorAll(`.${letter}`)
  for (const blank of blanks) {
    blank.textContent = letter
  }
};

//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  numWrong += 1;
  document.querySelector("img").src = `/static/images/guess${numWrong}.png`
  
  if (numWrong === 5){
    const buttons = document.querySelectorAll("button")
    for (const button of buttons){
      disableLetterButton(button)
    }
    document.querySelector("#play-again").style.display = ""
  }
  
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  
  const wordIndex = Math.floor(Math.random() * (WORDS.length + 1));
  const word = WORDS[wordIndex];

  createDivsForChars(word);
  generateLetterButtons();
  
  for (const button of document.querySelectorAll('button')) {
    // add an event handler to handle clicking on a letter button
    button.addEventListener("click", (evt) => {
      const letter = evt.target.innerText;
      const exist = isLetterInWord(letter, word);
      disableLetterButton(button)

      if (exist === true){
        handleCorrectGuess(letter);
        const letterBox = document.querySelectorAll(".letter-box");
        let checkedBox = 0
        for (const box of letterBox){
          if (box.textContent){
            checkedBox += 1;
          }
        }
        
        if (word.length === checkedBox) {
          document.querySelector("a").textContent = "You Won! Click here to play again"
          document.querySelector("#play-again").style.display = ""
        }

      } else {
        handleWrongGuess()
      }

      
    });
  }
  // add an event handler to handle clicking on the Play Again button
  const link = document.querySelector("a")
  link.addEventListener("click", resetGame)



})();
