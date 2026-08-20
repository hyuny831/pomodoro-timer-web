const STORAGE_KEY = "pomodoroMinutes";
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const minutesInput = document.getElementById("timer-minutes");
const saveBtn = document.getElementById("save-btn");

function loadSavedMinutes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved !== null) {
    minutesInput.value = saved;
  }
}

function updateSaveButtonState() {
  saveBtn.disabled = minutesInput.value.trim() === "";
}

function saveSettings() {
  const rawValue = minutesInput.value.trim();

  if (rawValue === "") {
    return; // 비어있으면 저장하지 않음 (버튼도 비활성화 상태)
  }

  const minutes = Number(rawValue);

  if (!Number.isFinite(minutes) || minutes < MIN_MINUTES || minutes > MAX_MINUTES) {
    alert(`타이머 시간은 ${MIN_MINUTES}분 이상 ${MAX_MINUTES}분 이하로 설정해주세요.`);
    return;
  }

  localStorage.setItem(STORAGE_KEY, String(minutes));
  alert("설정이 저장되었습니다.");
}

minutesInput.addEventListener("input", updateSaveButtonState);

loadSavedMinutes();
updateSaveButtonState();
