        // Function to get a cookie by name
        function getCookie(name) {
            let value = "; " + document.cookie;
            let parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(";").shift();
        }

        // Function to set a cookie
        function setCookie(name, value, days) {
            let expires = "";
            if (days) {
                let date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }

        // Check if the user has already visited
        if (!getCookie('visited')) {
            // Get the current count from local storage or initialize to 0
            let count = localStorage.getItem('page_view_count') || 0;
            
            // Increment the count
            count++;
            
            // Update the local storage with the new count
            localStorage.setItem('page_view_count', count);
            
            // Set a cookie to mark the user as visited
            setCookie('visited', 'true', 365); // Cookie expires in 1 year
            
            // Display the count
            document.getElementById('counter').innerText = count;
        } else {
            // Display the current count without incrementing
            document.getElementById('counter').innerText = localStorage.getItem('page_view_count');
        }