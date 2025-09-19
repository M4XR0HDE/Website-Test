document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = input.value.trim();

        if (query.length === 0) {
            alert("Please enter a search term.");
            return;
        }

        // You can replace this alert with actual search logic or API call

        // Optional: Clear input after search
        input.value = "";
    });
});