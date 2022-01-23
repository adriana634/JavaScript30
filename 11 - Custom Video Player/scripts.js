const togglePlayButton = document.querySelector('.player__button.toggle');
const videoViewer = document.querySelector('.player__video.viewer');
const progressFilled = document.querySelector('.progress__filled');
const progress = document.querySelector('.progress');
const volumeSlider = document.querySelector(".player__slider[name='volume']");
const playbackRateSlider = document.querySelector(".player__slider[name='playbackRate']");
const skipButtons = document.querySelectorAll('.player__button[data-skip]');

const playShape = '►';
const pauseShape = '▮▮';

function handleTimeUpdate(event) {
    const currentTime = event.target.currentTime;
    const totalTime = videoViewer.duration;
    const currentTimePercentage = (currentTime / totalTime) * 100;
    progressFilled.style = `flex-basis: ${currentTimePercentage}%`;
}

function handleProgressInput(event) {
    const progressOffsetX = event.offsetX;
    const progressWidth = event.currentTarget.clientWidth;
    const totalTime = videoViewer.duration;
    const currentTime = (progressOffsetX * totalTime) / progressWidth;
    videoViewer.currentTime = currentTime;
}

function handleProgressMouseDown(event) {
    const progress = event.currentTarget;
    progress.addEventListener('mousemove', handleProgressInput);
}

function handleProgressMouseUp(event) {
    const progress = event.currentTarget;
    progress.removeEventListener('mousemove', handleProgressInput);
}

function handleVolumeInput(event) {
    const volume = event.target.value;
    videoViewer.volume = volume;
}

function handlePlaybackRateInput(event) {
    const playbackRate = event.target.value;
    videoViewer.playbackRate = playbackRate;
}

function handlePlayToggle() {
    if (videoViewer.paused) {
        videoViewer.play();
        togglePlayButton.innerText = pauseShape;
    } else {
        videoViewer.pause();
        togglePlayButton.innerText = playShape;
    }
}

function handleSkipButton(event) {
    const skipValue = Number(event.target.dataset.skip);
    videoViewer.currentTime = videoViewer.currentTime + skipValue;
}

videoViewer.addEventListener('timeupdate', handleTimeUpdate);
videoViewer.addEventListener('click', handlePlayToggle);

progress.addEventListener('mousedown', handleProgressMouseDown);
progress.addEventListener('click', handleProgressInput);
progress.addEventListener('mouseup', handleProgressMouseUp);

volumeSlider.addEventListener('input', handleVolumeInput);
playbackRateSlider.addEventListener('input', handlePlaybackRateInput);

togglePlayButton.addEventListener('click', handlePlayToggle);
skipButtons.forEach(button => button.addEventListener('click', handleSkipButton));