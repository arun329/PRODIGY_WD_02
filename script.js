let timer; // Timer variable
let startTime; // Start time
let elapsedTime = 0; // Elapsed time in milliseconds
let isRunning = false; // Flag to track if the stopwatch is running

function startStop() {
  if (isRunning) {
    clearInterval(timer); // Stop the timer
    document.getElementById("startStopBtn").textContent = "Start"; // Change button text to Start
  } else {
    startTime = Date.now() - elapsedTime; // Update start time accounting for elapsed time
    timer = setInterval(updateTime, 10); // Start the timer
    document.getElementById("startStopBtn").textContent = "Stop"; // Change button text to Stop
  }
  isRunning = !isRunning; // Toggle running flag
}

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;
  displayTime(elapsedTime);
}

function displayTime(milliseconds) {
  const display = document.getElementById("display");
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  const formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  display.textContent = formattedTime;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

function lap() {
  const lapsDiv = document.getElementById("laps");
  const lapTime = elapsedTime;
  const formattedLapTime = displayTime(lapTime);
  const lapElement = document.createElement("div");
  lapElement.textContent = `Lap ${lapsDiv.childElementCount + 1}: ${formattedLapTime}`;
  lapsDiv.prepend(lapElement);
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  displayTime(elapsedTime);
  document.getElementById("startStopBtn").textContent = "Start";
  document.getElementById("laps").innerHTML = "";
}
