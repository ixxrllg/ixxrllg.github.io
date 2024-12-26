// Funkcja generująca unikalne ID na podstawie informacji o przeglądarce
function generateUniqueId() {
    const browserInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    return btoa(JSON.stringify(browserInfo)).replace(/[^a-zA-Z0-9]/g, '');
}

// Sprawdzanie i tworzenie unikalnego identyfikatora w cookies
function getUserFingerprint() {
    let fingerprint = getCookie("userFingerprint");
    if (!fingerprint) {
        fingerprint = generateUniqueId();
        setCookie("userFingerprint", fingerprint, 365); // Cookie ważne przez rok
    }
    return fingerprint;
}

// Funkcje pomocnicze do obsługi cookies
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

document.addEventListener("DOMContentLoaded", function() {
    const fingerprint = getUserFingerprint();
    const today = new Date().toISOString().split('T')[0];
    const lastVisit = getCookie("lastVisitDate");

    if (lastVisit !== today) {
        // Pobierz aktualną liczbę wizyt z localStorage
        let totalVisits = parseInt(localStorage.getItem("totalVisits") || "0");
        
        // Zwiększ licznik tylko jeśli to nowa wizyta w danym dniu
        totalVisits++;
        localStorage.setItem("totalVisits", totalVisits.toString());
        
        // Zapisz datę ostatniej wizyty
        setCookie("lastVisitDate", today, 365);
    }

    // Wyświetl całkowitą liczbę unikalnych wizyt
    const visitsCount = localStorage.getItem("totalVisits") || "0";
    document.getElementById("visit-count").innerText = visitsCount;
});
