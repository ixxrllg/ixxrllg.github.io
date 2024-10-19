class VisitorCounter {
    constructor() {
        this.localStorageKey = 'site_visit';
        this.visitCountElement = document.getElementById('counter');
        this.checkAndUpdateVisits();
    }

    hasVisitedBefore() {
        return localStorage.getItem(this.localStorageKey) !== null;
    }

    saveVisit() {
        const currentTimestamp = new Date().getTime();
        localStorage.setItem(this.localStorageKey, currentTimestamp);
    }

    checkAndUpdateVisits() {
        if (!this.hasVisitedBefore()) {
            this.incrementVisitCount();
            this.saveVisit();
        } else {
            console.log('User has already visited the site.');
        }
    }

    incrementVisitCount() {
        let currentCount = parseInt(this.visitCountElement.textContent);
        currentCount += 1;
        this.visitCountElement.textContent = currentCount;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const visitorCounter = new VisitorCounter();
});
