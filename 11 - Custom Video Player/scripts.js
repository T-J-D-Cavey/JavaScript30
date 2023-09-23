/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
let sliderSelected = false;

function togglePlay() {
    const action = video.paused ? 'play' : 'pause';
    video[action]();
}

function updateButton(e) {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    const amount = +this.dataset.skip;
    video.currentTime += amount;
}

function handleSlider() {
    if(!sliderSelected) return;
    video[this.name] = this.value;
}

function toggleSlider(e) {
    sliderSelected = e.type === 'mousedown' ? true : false;
}

function handleProgress(e) {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style = `flex-basis: ${percent}%`;
}

function scrub(e) {
    const percent = e.offsetX / this.offsetWidth;
    const duration = video.duration * percent;
    video.currentTime = duration;

}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('playing', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(slider => slider.addEventListener('mousemove', handleSlider));
ranges.forEach(slider => slider.addEventListener('mousedown', toggleSlider));
ranges.forEach(slider => slider.addEventListener('mouseup', toggleSlider));
progress.addEventListener('click', scrub);

