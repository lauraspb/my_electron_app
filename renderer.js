// --- track timer state and help update plant stage ---
let timer;                // interval id
let timeLeft = 25 * 60;   // 25 min * 60 secs
let isRunning = false;    // toggled by start, pause, and reset
const totalTime = 25 * 60; // used to calc timepassed and determine plant growth stage
let timePassed; // for growth stage calc

// --- html elements: buttons, images, etc. ---
const startBtn = document.getElementById('btn-start');
const pauseBtn = document.getElementById('btn-pause');
const resetBtn = document.getElementById('btn-reset');
const plantImg = document.getElementById('plant-img');
const timeDisplay = document.getElementById('time-display');
const taskInput = document.getElementById('task-input');
const isDevMode = true; // 5 secs when true and 5 mins when false
const stageDuration = isDevMode ? 5 : (5 * 60)

// timer text
timeDisplay.style.fontSize = "90px";
timeDisplay.style.fontFamily = "DIGI";
timeDisplay.innerText = formatTime(timeLeft);

// place timer before/above buttons
document.querySelector('.controls').before(timeDisplay);

// --- helper fxs ---

// calc seconds into a format, min:sec
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// updates timer while also updating plant growth stage
let currentStage = 1;
const maxStages = 12;
const plantImage = document.getElementById('plant-img') // will be changing in timer, start, reset button

function updateTimer() {
  if (timeLeft > 0 && currentStage < maxStages) { // when isDevMode = true this will stop early (12stage * 5sec = 60 sec)
    timePassed = totalTime - timeLeft
    currentStage = 1 + Math.floor(timePassed / stageDuration)

    plantImage.src = `images/plant_stages/plant${currentStage}.png`; // update plant image to current stage

    timeLeft--;
    timeDisplay.innerText = formatTime(timeLeft);
  } else {
    // TIMEs UP!
    clearInterval(timer);
    isRunning = false;

    alert("Time's up!"); 
  }
}

// --- button functionality ---

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    timer = setInterval(updateTimer, 1000); // update timer every 1 sec
    isRunning = true;

    const currentTask = taskInput.value;

    if (currentTask === "") {
          console.log("No task typed!");
        } else {
          console.log("User is focusing on:", currentTask);
        }
    
    // stop taking input for intention setting
    taskInput.disabled = true;

    // style when active / timer running
    startBtn.style.opacity = "0.5";
    startBtn.style.cursor = "default";
    pauseBtn.style.opacity = "1";
    pauseBtn.style.cursor = "pointer";
  }
});

pauseBtn.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timer); 
    isRunning = false;
    
    startBtn.style.opacity = "1";
    startBtn.style.cursor = "pointer";
    pauseBtn.style.opacity = "0.5";
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60; // reset time, back to 25 mins
  timeDisplay.innerText = formatTime(timeLeft);

  // editable input and clear intention, prompt for what's next
  taskInput.disabled = false;
  taskInput.value = ""; // Clears the text so you can type a new task
  taskInput.placeholder = "What's next?"; // Cute prompt for next task


  // update image back to pot
  currentStage = 1
  plantImage.src = `images/plant_stages/plant${currentStage}.png`;
  
  startBtn.style.opacity = "1";
  startBtn.style.cursor = "pointer";
  pauseBtn.style.opacity = "1";
});