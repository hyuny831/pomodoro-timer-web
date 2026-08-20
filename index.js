const STORAGE_KEY = "pomodoroMinutes";
const DEFAULT_MINUTES = 25;

const timeDisplay = document.getElementById("time");

function getMinutesSetting() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const minutes = Number(saved);
  return saved !== null && Number.isFinite(minutes) ? minutes : DEFAULT_MINUTES;
}

let remainingSeconds = getMinutesSetting() * 60;
let timerId = null;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingSeconds);
}

function startTimer() {
  if (timerId !== null) return; // 이미 실행 중이면 중복 실행 방지

  timerId = setInterval(() => {
    if (remainingSeconds <= 0) {
      stopTimer();
      return;
    }
    remainingSeconds--;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();
  remainingSeconds = getMinutesSetting() * 60;
  updateDisplay();
}

updateDisplay();
