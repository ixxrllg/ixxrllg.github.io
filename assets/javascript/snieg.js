let snowflakeTimer;
document.addEventListener("mousemove", function(e) {
    // Upewnij się, że śnieg pojawia się nie częściej niż co 100 ms
    if (snowflakeTimer) clearTimeout(snowflakeTimer);
    snowflakeTimer = setTimeout(() => {
        let snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflake.style.left = `${e.pageX}px`;
        snowflake.style.top = `${e.pageY}px`;
        snowflake.style.pointerEvents = "none"; // Zapobiega rejestrowaniu śniegu jako kliknięcia

        document.body.appendChild(snowflake);

        // Usunięcie śniegu po 2 sekundach
        setTimeout(() => snowflake.remove(), 2000);
    }, 10); // Debounce co 100 ms
});

const snowflakeImages = [
    "assets/icons/snowflake1.png",
    "assets/icons/snowflake2.png",
    "assets/icons/snowflake3.png"
];

document.addEventListener("mousemove", function(e) {
    let snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");

    // Losowy obrazek płatka śniegu
    const randomImage = snowflakeImages[Math.floor(Math.random() * snowflakeImages.length)];
    snowflake.style.backgroundImage = `url(${randomImage})`;

    // Losowy rozmiar płatka śniegu
    const size = Math.floor(Math.random() * 10) + 10; // między 10 a 20 pikseli
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    snowflake.style.left = `${e.pageX}px`;
    snowflake.style.top = `${e.pageY}px`;
    document.body.appendChild(snowflake);

    // Usunięcie płatka śniegu po 3 sekundach
    setTimeout(() => snowflake.remove(), 3000);
});

