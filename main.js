window.addEventListener('load', init);

// Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 1
}

let currentLevel = levels.easy;

// Global Vars
let time = currentLevel;
let score = 0;
let isPlaying;
let words = [];

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

// Getting words array
class HTTP {
  async get(url) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }
}
const http = new HTTP;
http.get('https://raw.githubusercontent.com/words/an-array-of-english-words/master/words.json').then(data => words.push(data));

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from the array
  showWord();
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Showing starttime in template
  timeDisplay.innerHTML = time;
  // Call countdown every second
  setTimeout(() => setInterval(countdown, 1000), 200)
  // Check game status
  setInterval(checkStatus, 100);
}

// Pick and show random word from the array
function showWord() {
  // Generate random index
  const randIndex = Math.floor(Math.random() * 274918);
  // Output a random word
  setTimeout(() => {currentWord.innerHTML = words[0][randIndex]}, 200)
}

// Start match
function startMatch() {
  if (matchWord()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord();
    wordInput.value = '';
    score++;
  }
  // If score is -1, display 0
  if (score == -1) {
    // scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match current word to word input
function matchWord() {
  if (wordInput.value == currentWord.innerHTML) {
    message.innerHTML = 'Correct';
    return true;
  } else {
    return false;
  }
}

// Countdown timer
function countdown() {
  // Check if time is not ran out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time == 0) {
    // Game over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time == 0) {
    message.innerHTML = 'Game Over';
    score = -1;
  }
}