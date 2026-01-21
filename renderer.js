// --- 1. Variables to track the state ---
let timer;                // Will hold the interval ID so we can stop it later
let timeLeft = 25 * 60;   // 25 minutes converted to seconds
let isRunning = false;    // Tracks if the timer is currently counting down

// --- 2. Link to the HTML elements ---
const startBtn = document.getElementById('btn-start');
const pauseBtn = document.getElementById('btn-pause');
const resetBtn = document.getElementById('btn-reset');
const plantImg = document.getElementById('plant-img');
const timeDisplay = document.getElementById('time-display');

// Create the timer text display dynamically// Styling the text to look nice
timeDisplay.style.fontSize = "55px";
timeDisplay.style.fontWeight = "bold";
timeDisplay.style.fontFamily = "Tiny5";
timeDisplay.style.color = "#4a5a3a";
timeDisplay.innerText = formatTime(timeLeft); // Set initial text

// Add the timer text just above the buttons
document.querySelector('.controls').before(timeDisplay);

// --- 3. Helper Functions ---

// Converts seconds (e.g. 1500) into "25:00"
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  // .padStart(2, '0') ensures we get "05" instead of just "5"
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// The function that runs every second
function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--; // Decrease time by 1 second
    timeDisplay.innerText = formatTime(timeLeft);
  } else {
    // Time is up!
    clearInterval(timer);
    isRunning = false;
    // Optional: Play a sound or show an alert here
    alert("Time's up!"); 
  }
}

// --- 4. Button Actions ---

// START
startBtn.addEventListener('click', () => {
  if (!isRunning) {
    timer = setInterval(updateTimer, 1000); // Run updateTimer every 1000ms (1 sec)
    isRunning = true;
    
    // Visual feedback: dim the start button so user knows it's active
    startBtn.style.opacity = "0.5";
    startBtn.style.cursor = "default";
    pauseBtn.style.opacity = "1";
    pauseBtn.style.cursor = "pointer";
  }
});

// PAUSE
pauseBtn.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timer); // Stop the interval
    isRunning = false;
    
    // Reset visuals
    startBtn.style.opacity = "1";
    startBtn.style.cursor = "pointer";
    pauseBtn.style.opacity = "0.5";
  }
});

// RESET
resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60; // Reset time variable back to 25 mins
  timeDisplay.innerText = formatTime(timeLeft); // Update screen immediately
  
  // Reset visuals
  startBtn.style.opacity = "1";
  startBtn.style.cursor = "pointer";
  pauseBtn.style.opacity = "1";
});