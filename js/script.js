// ==========================================
// GLOBAL SMART MUSIC PLAYER (FOR ALL PAGES)
// ==========================================

const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

// 1. Play / Pause Functionality
playButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playButton.innerHTML = "❚❚";
    } else {
        audio.pause();
        playButton.innerHTML = "▶";
    }
});

// 2. Live Progress Update
audio.addEventListener("timeupdate", () => {
    if (isNaN(audio.duration)) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";
    current.innerHTML = formatTime(audio.currentTime);
});

// 3. Audio Metadata Loaded safely
function displayDuration() {
    duration.innerHTML = formatTime(audio.duration);
}

if (audio.readyState >= 2) {
    displayDuration();
} else {
    audio.addEventListener("loadedmetadata", displayDuration);
}

// 4. Smart Click on Progress Bar (Fixes RTL/LTR bugs)
progressContainer.addEventListener("click", (e) => {
    if (isNaN(audio.duration)) return;
    
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // موقعیت دقیق کلیک فارغ از جهت صفحه
    const width = rect.width;
    
    audio.currentTime = (clickX / width) * audio.duration;
});

// 5. Handle Song Ending
audio.addEventListener("ended", () => {
    playButton.innerHTML = "▶";
    progress.style.width = "0%";
    current.innerHTML = "0:00";
});

// 6. Time Formatter Utility
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
}