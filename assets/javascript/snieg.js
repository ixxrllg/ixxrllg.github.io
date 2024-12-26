function createRandomSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    
    // Losowy obrazek płatka śniegu
    const snowflakeImages = [
        "assets/icons/snowflake1.png",
        "assets/icons/snowflake2.png",
        "assets/icons/snowflake3.png"
    ];
    const randomImage = snowflakeImages[Math.floor(Math.random() * snowflakeImages.length)];
    snowflake.style.backgroundImage = `url(${randomImage})`;

    // Losowy rozmiar 8-16px
    const size = Math.floor(Math.random() * 8) + 8;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    // Losowy kąt obrotu
    const rotation = Math.random() * 360;
    snowflake.style.transform = `rotate(${rotation}deg)`;

    // Losowa pozycja początkowa na górze ekranu
    const x = Math.random() * window.innerWidth;
    snowflake.style.left = `${x}px`;
    snowflake.style.top = '0px';
    
    document.body.appendChild(snowflake);

    // Automatyczne usuwanie po animacji
    setTimeout(() => {
        if (snowflake && snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
    }, 3000);
}

// Tworzenie nowych płatków w regularnych odstępach czasu
function startSnowfall() {
    setInterval(() => {
        createRandomSnowflake();
    }, 100); // Nowy płatek co 100ms
}

// Rozpoczęcie padania śniegu po załadowaniu strony
document.addEventListener("DOMContentLoaded", startSnowfall);
