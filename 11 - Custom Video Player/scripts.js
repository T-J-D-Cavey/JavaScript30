/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
let sliderSelected = false;
let progressSelected = false;

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

function handleSlider(e) {
    video[e.target.name] = e.target.value;
}

function handleProgress(e) {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style = `flex-basis: ${percent}%`;
}

function scrub(e) {
    const percent = e.offsetX / progress.offsetWidth;
    const duration = video.duration * percent;
    video.currentTime = duration;
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(slider => slider.addEventListener('mousemove', (e) => sliderSelected && handleSlider(e)));
ranges.forEach(slider => slider.addEventListener('mousedown', () => sliderSelected = true));
ranges.forEach(slider => slider.addEventListener('mouseup', () => sliderSelected = false));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => progressSelected && scrub(e));
progress.addEventListener('mousedown', () => progressSelected = true);
progress.addEventListener('mouseup', () => progressSelected = false);


