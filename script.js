let timerInterval = null;
let totalSeconds = 0;
let isPaused = true;
let justStarted = true;

function startTimer() {
    if (isPaused) {
        isPaused = false;
        if (justStarted) {
            playSound('boxing-round-bell.mp3');
            flashColor('green', 500);  // Flash green on start
            justStarted = false;
        }
        if (!timerInterval) {
            timerInterval = setInterval(updateTimer, 1000);
        }
    }
}

function pauseTimer() {
    isPaused = true;
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    totalSeconds = 0;
    isPaused = true;
    justStarted = true;
    updateDisplay(0, 0);
    document.body.style.backgroundColor = 'black';
}

function updateTimer() {
    if (!isPaused) {
        totalSeconds++;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        updateDisplay(minutes, seconds);
        checkTimeEvents(seconds, minutes);
    }
}

function updateDisplay(minutes, seconds) {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `${pad(minutes)}:${pad(seconds)}`;
}

function checkTimeEvents(seconds, minutes) {
    if (seconds === 0 && totalSeconds !== 0) {
        playSound('boxing-round-bell.mp3');
        flashColor('green', 500);
    } else if (seconds >= 50 && seconds % 2 === 0) {
        playSound('censor-beep-1.mp3');
        flashColor('red', 1000);
    } else {
        document.body.style.backgroundColor = 'black';
    }
}

function playSound(soundFile) {
    const sound = new Audio(soundFile);
    sound.play();
}

function pad(number) {
    return number < 10 ? `0${number}` : number;
}

function flashColor(color, duration) {
    document.body.style.backgroundColor = color;
    setTimeout(() => document.body.style.backgroundColor = 'black', duration);
}

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);

