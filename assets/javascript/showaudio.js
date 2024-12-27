// Funkcja aktualizująca informacje o odtwarzanym utworze
function updateNowPlaying() {
    // Sprawdź czy kontener jest widoczny (druga strona)
    const container = document.querySelector('.container');
    if (container.style.display === 'none') {
        // Jeśli jesteśmy na pierwszej stronie, ukryj informację
        let nowPlayingDiv = document.getElementById('now-playing');
        if (nowPlayingDiv) {
            nowPlayingDiv.style.display = 'none';
        }
        return;
    }

    // Pobierz element audio i wideo
    const audio = document.getElementById('audio');
    const video = document.getElementById('background');
    
    // Pobierz aktualnie odtwarzany plik
    const currentSource = audio.src || video.src;
    
    // Wyciągnij nazwę pliku z ścieżki
    const fileName = currentSource.split('/').pop().replace(/%20/g, ' ').replace(/\.[^/.]+$/, '');
    
    // Sprawdź czy element informacyjny już istnieje
    let nowPlayingDiv = document.getElementById('now-playing');
    if (!nowPlayingDiv) {
        // Jeśli nie istnieje, stwórz nowy
        nowPlayingDiv = document.createElement('div');
        nowPlayingDiv.id = 'now-playing';
        document.body.appendChild(nowPlayingDiv);
    }
    
    // Oblicz aktualny czas i całkowitą długość
    const currentTime = audio.currentTime || video.currentTime;
    const duration = audio.duration || video.duration;
    const progress = (currentTime / duration) * 100;
    
    // Formatuj czas
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    
    // Pokaż element i zaktualizuj treść
    nowPlayingDiv.style.display = 'block';
    nowPlayingDiv.innerHTML = `
        <div class="now-playing-content">
            <i class="fas fa-music"></i>
            <div class="track-info">
                <span class="track-name">${fileName}</span>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
                <div class="time-info">
                    <span>${formatTime(currentTime)}</span>
                    <span>${formatTime(duration)}</span>
                </div>
            </div>
        </div>
    `;
}

// Dodaj style CSS dynamicznie
const style = document.createElement('style');
style.textContent = `
    #now-playing {
        position: fixed;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        padding: 10px 20px;
        border-radius: 20px;
        color: #e4e3e3;
        font-family: consolas, sans-serif;
        z-index: 1000;
        border: 1px solid #ff66d9;
        box-shadow: 0 0 10px rgba(255, 102, 217, 0.3);
        display: none;
        width: 90%;
        max-width: 400px;
        min-width: 200px;
        margin: 0 10px;
    }

    .now-playing-content {
        display: flex;
        align-items: center;
        gap: 15px;
        animation: glow 2s infinite;
    }

    .now-playing-content i {
        color: #ff66d9;
        font-size: 1.2em;
        flex-shrink: 0;
    }

    .track-info {
        flex-grow: 1;
        min-width: 0;
    }

    .track-name {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 5px;
        font-size: 0.9em;
    }

    .progress-container {
        margin: 8px 0;
        background: rgba(255, 255, 255, 0.1);
        height: 4px;
        border-radius: 2px;
        position: relative;
        overflow: hidden;
    }

    .progress-bar {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background: #ff66d9;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px #ff66d9;
    }

    .time-info {
        display: flex;
        justify-content: space-between;
        font-size: 0.8em;
        margin-top: 4px;
        color: rgba(228, 227, 227, 0.8);
    }

    @keyframes glow {
        0% { text-shadow: 0 0 5px #ff66d9; }
        50% { text-shadow: 0 0 20px #ff66d9; }
        100% { text-shadow: 0 0 5px #ff66d9; }
    }

    #now-playing:hover {
        transform: translateX(-50%) scale(1.02);
        transition: transform 0.3s ease;
    }

    .progress-bar::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: shine 1.5s infinite;
    }

    @keyframes shine {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }

    @media (max-width: 480px) {
        #now-playing {
            padding: 6px 12px;
            bottom: 5px;
            width: calc(100% - 20px);
            min-width: auto;
            max-width: none;
            margin: 0 auto;
            border-width: 2px;
        }

        .now-playing-content {
            gap: 8px;
        }

        .track-name {
            font-size: 0.8em;
        }

        .time-info {
            font-size: 0.7em;
            margin-top: 2px;
        }

        .now-playing-content i {
            font-size: 1em;
        }

        .progress-container {
            margin: 4px 0;
            height: 3px;
        }
    }
`;
document.head.appendChild(style);

// Nasłuchuj zmian w źródle audio/video
const audioElement = document.getElementById('audio');
const videoElement = document.getElementById('background');

audioElement.addEventListener('play', updateNowPlaying);
videoElement.addEventListener('play', updateNowPlaying);

// Aktualizuj pasek postępu co 100ms podczas odtwarzania
setInterval(() => {
    if (audioElement.paused && videoElement.paused) return;
    updateNowPlaying();
}, 100);

// Inicjalizuj przy załadowaniu strony
window.addEventListener('load', updateNowPlaying);

// Nasłuchuj zmian widoczności kontenera
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
