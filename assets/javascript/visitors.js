// Funkcja generująca unikalne ID dla każdego użytkownika
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

function getUserId() {
    let userId = localStorage.getItem("userId");
    if (!userId) {
        userId = generateUserId();
        localStorage.setItem("userId", userId);
    }
    return userId;
}

document.addEventListener("DOMContentLoaded", function() {
    const today = new Date().toISOString().split('T')[0];
    const lastVisit = localStorage.getItem("lastVisitDate");

    if (lastVisit !== today) {
        let visitCount = parseInt(localStorage.getItem("visitCount") || 0);
        visitCount++;
        localStorage.setItem("visitCount", visitCount);
        localStorage.setItem("lastVisitDate", today);
    }

    document.getElementById("visit-count").innerText = localStorage.getItem("visitCount") || 1;
});
