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
    
    // Pokaż element i zaktualizuj treść
    nowPlayingDiv.style.display = 'block';
    nowPlayingDiv.innerHTML = `
        <div class="now-playing-content">
            <i class="fas fa-music"></i>
            <span>Aktualnie gra: ${fileName}</span>
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
    }

    .now-playing-content {
        display: flex;
        align-items: center;
        gap: 10px;
        animation: glow 2s infinite;
    }

    .now-playing-content i {
        color: #ff66d9;
    }

    @keyframes glow {
        0% { text-shadow: 0 0 5px #ff66d9; }
        50% { text-shadow: 0 0 20px #ff66d9; }
        100% { text-shadow: 0 0 5px #ff66d9; }
    }

    #now-playing:hover {
        transform: translateX(-50%) scale(1.05);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Nasłuchuj zmian w źródle audio/video
document.getElementById('audio').addEventListener('play', updateNowPlaying);
document.getElementById('background').addEventListener('play', updateNowPlaying);

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
