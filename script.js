const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = letters.split("");
const lettersContainer = document.querySelector(".letters");
lettersArray.forEach((letter) => {
  const span = document.createElement("span");
  span.innerHTML = letter;
  span.classList.add("letter-box");
  lettersContainer.appendChild(span);
});
const words = {
  programming: [
    "php",
    "javascript",
    "python",
    "scala",
    "ruby",
    "angular",
    "vue",
    "react",
    "go"
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Momento",
    "Coco"
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahmata Ghandi"
  ],
  countries: ["Egypt", "Syria", "Palestine", "Yemen", "Qatar", "Bahrain"]
};
let allKeys = Object.keys(words);
let randomPropertyNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropertyNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValue = randomPropValue[randomValueNumber];
document.querySelector(".game-info .category span").innerHTML = randomPropName;

const lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = [...randomValue];

lettersAndSpace.forEach((letter) => {
  const emptySpan = document.createElement("span");
  if (letter === " ") {
    emptySpan.classList.add("with-space");
  }
  lettersGuessContainer.appendChild(emptySpan);
});
const guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;
const theDraw = document.querySelector(".hangman-draw");
document.addEventListener("click", (e) => {
  let theStatus = false;
  if (e.target.classList.contains("letter-box")) {
    e.target.classList.add("clicked");
    const clickedeLetter = e.target.innerHTML.toLowerCase();
    const chosenWord = [...randomValue.toLowerCase()];
    chosenWord.forEach((wordLetter, wordIndex) => {
      if (clickedeLetter === wordLetter) {
        theStatus = true;
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = wordLetter;
          }
        });
      }
    });
    if (theStatus !== true) {
      wrongAttempts++;
      if (wrongAttempts < 8) {
        document.getElementById("fail").play();
      }
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
        document.getElementById("game-over").play();
      }
    } else {
      document.getElementById("success").play();
    }
  }
});

function endGame() {
  Swal.fire({
    title: `Game Over!, The Word is: ${randomValue}`, 
    text: "Do you want to try again?",
    icon: "error",
    confirmButtonText: "Try Again"
  });
  document
    .querySelector(".swal2-confirm.swal2-styled")
    .addEventListener("click", () => {
      window.location.reload();
    });
}
