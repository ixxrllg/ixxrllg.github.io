document.addEventListener("DOMContentLoaded", function() {
    if (!document.cookie.includes("visited=true")) {
        let visitCount = localStorage.getItem("visitCount") || 0;
        visitCount++;
        localStorage.setItem("visitCount", visitCount);
        document.cookie = "visited=true; max-age=86400"; // 1 dzień
    }
    document.getElementById("visit-count").innerText = localStorage.getItem("visitCount") || 1;
});
