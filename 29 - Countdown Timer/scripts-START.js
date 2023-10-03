const buttons = document.querySelectorAll('.timer__button');
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
let counter;
function setTime(seconds) {
    clearInterval(counter);

    const now = Date.now();
    const then = now + (seconds * 1000);
    displayTime(seconds);
    displayEndTime(then)
    counter = setInterval(() => {
        seconds--; 
        if(seconds < 0) {
            clearInterval(counter);
            return;
        } else {
            displayTime(seconds);
        }
    }, 1000)
}

function displayTime(secondsLeft) {
    const hours = Math.floor(secondsLeft / 3600);
    let remainingSeconds = secondsLeft % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;
    timeLeft.textContent = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

function displayEndTime(time) {
    const end = new Date(time);
    const hours = end.getHours();
    const actualHours = hours < 10 ? `0${hours}` : hours;
    const mins = end.getMinutes();
    const actualMins = mins < 10 ? `0${mins}` : mins;
    endTime.textContent = `Back at: ${actualHours}:${actualMins}`;
};

buttons.forEach(button => button.addEventListener('click', function(e) {
    e.preventDefault();
    setTime(this.dataset.time);
}))

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.dir(this.minutes);
    setTime(parseInt(this.minutes.value));
    e.target.reset();
})