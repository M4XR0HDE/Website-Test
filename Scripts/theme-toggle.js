// Persist theme and update button text using cookies
const themeToggle = document.getElementById('themeToggle');
function setTheme(dark) {
    // Toggle dark-theme on both <html> and <body> for full coverage
    document.documentElement.classList.toggle('dark-theme', dark);
    document.body.classList.toggle('dark-theme', dark);
    themeToggle.textContent = dark ? 'Light Mode' : 'Dark Theme';
    document.cookie = `darkTheme=${dark ? '1' : '0'}; path=/;`;
}

themeToggle.onclick = () => setTheme(!document.documentElement.classList.contains('dark-theme'));
// On load
setTheme(document.documentElement.classList.contains('dark-theme'));
