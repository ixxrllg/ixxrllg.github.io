// Funkcja aktualizująca informacje o odtwarzanym utworze
function updateNowPlaying() {
    const container = document.querySelector('.container');
    if (container.style.display === 'none') {
        let nowPlayingDiv = document.getElementById('now-playing');
        if (nowPlayingDiv) {
            nowPlayingDiv.style.display = 'none';
        }
        return;
    }

    const audio = document.getElementById('audio');
    const video = document.getElementById('background');
    const currentSource = audio.src || video.src;
    const fileName = currentSource.split('/').pop().replace(/%20/g, ' ').replace(/\.[^/.]+$/, '');
    
    let nowPlayingDiv = document.getElementById('now-playing');
    if (!nowPlayingDiv) {
        nowPlayingDiv = document.createElement('div');
        nowPlayingDiv.id = 'now-playing';
        document.body.appendChild(nowPlayingDiv);
    }
    
    const currentTime = audio.currentTime || video.currentTime;
    const duration = audio.duration || video.duration;
    const progress = (currentTime / duration) * 100;
    
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const isPlaying = !(audio.paused && video.paused);
    const playIcon = isPlaying ? 'fa-pause' : 'fa-play';

    nowPlayingDiv.style.display = 'block';
    nowPlayingDiv.innerHTML = `
        <div class="now-playing-content">
            <i class="fas fa-music music-icon"></i>
            <div class="track-info">
                <span class="track-name">${fileName}</span>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${progress}%">
                        <div class="progress-glow"></div>
                    </div>
                </div>
                <div class="time-info">
                    <span>${formatTime(currentTime)}</span>
                    <i class="fas ${playIcon} play-icon"></i>
                    <span>${formatTime(duration)}</span>
                </div>
            </div>
        </div>
    `;
}

// Style CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    @keyframes glow {
        0% { box-shadow: 0 0 5px #ff66d9; }
        50% { box-shadow: 0 0 20px #ff66d9; }
        100% { box-shadow: 0 0 5px #ff66d9; }
    }

    @keyframes slideIn {
        from { transform: translateX(-50%) translateY(100px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }

    #now-playing {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        padding: 15px 25px;
        border-radius: 25px;
        color: #fff;
        font-family: Arial, sans-serif;
        z-index: 1000;
        border: 2px solid #ff66d9;
        min-width: 300px;
        backdrop-filter: blur(10px);
        animation: slideIn 0.5s ease-out, glow 2s infinite;
        transition: all 0.3s ease;
    }

    #now-playing:hover {
        transform: translateX(-50%) scale(1.02);
        border-color: #ff99e6;
    }

    .now-playing-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .music-icon {
        font-size: 24px;
        color: #ff66d9;
        animation: pulse 2s infinite;
    }

    .track-info {
        flex-grow: 1;
    }

    .track-name {
        font-size: 14px;
        margin-bottom: 8px;
        color: #ff66d9;
        font-weight: bold;
        text-shadow: 0 0 5px rgba(255, 102, 217, 0.5);
    }

    .progress-container {
        background: rgba(255, 255, 255, 0.1);
        height: 6px;
        border-radius: 3px;
        margin: 8px 0;
        overflow: hidden;
    }

    .progress-bar {
        background: linear-gradient(90deg, #ff66d9, #ff99e6);
        height: 100%;
        border-radius: 3px;
        transition: width 0.1s linear;
        position: relative;
    }

    .progress-glow {
        position: absolute;
        top: 0;
        right: 0;
        width: 10px;
        height: 100%;
        background: #fff;
        filter: blur(3px);
        opacity: 0.6;
    }

    .time-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
    }

    .play-icon {
        color: #ff66d9;
        font-size: 14px;
        transition: transform 0.3s ease;
    }

    .play-icon:hover {
        transform: scale(1.2);
        cursor: pointer;
    }
`;

document.head.appendChild(style);

const audioElement = document.getElementById('audio');
const videoElement = document.getElementById('background');

audioElement.addEventListener('play', updateNowPlaying);
videoElement.addEventListener('play', updateNowPlaying);
audioElement.addEventListener('pause', updateNowPlaying);
videoElement.addEventListener('pause', updateNowPlaying);

setInterval(() => {
    if (audioElement.paused && videoElement.paused) return;
    updateNowPlaying();
}, 100);

window.addEventListener('load', updateNowPlaying);

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            updateNowPlaying();
        }
    });
});

observer.observe(document.querySelector('.container'), {
    attributes: true
});
