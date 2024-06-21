    //Page refresh logic to maintain the state of the accordion
    // Function to display the last refreshed time
   export function displayLastRefreshed() {
        const lastRefreshTime = new Date();
        const $lastRefreshed = $('#lastRefreshed');

        function updateRefreshTime() {
            const currentTime = new Date();
            const timeDifference = Math.floor((currentTime - lastRefreshTime) / 60000); // Convert milliseconds to minutes
            $lastRefreshed.html(`Page refreshed ${timeDifference} minute(s) ago
                <i id="refreshIcon" class="fa-solid fa-sync" style="cursor: pointer; margin-left: 10px;"></i>`);
            
            // Add event listener for refresh icon
            $('#refreshIcon').on('click', function() {
                location.reload();
            });
        }

        updateRefreshTime();
        setInterval(updateRefreshTime, 60000); // Update every minute
    }//end of displayLastRefreshed function

    displayLastRefreshed();