// Persist theme and update button text
const themeToggle = document.getElementById('themeToggle');
function setTheme(dark) {
    document.body.classList.toggle('dark-theme', dark);
    document.documentElement.classList.toggle('dark-theme', dark);
    themeToggle.textContent = dark ? 'Light Mode' : 'Dark Theme';
    localStorage.setItem('darkTheme', dark ? '1' : '0');
}
themeToggle.onclick = () => setTheme(!document.body.classList.contains('dark-theme'));
// On load
setTheme(localStorage.getItem('darkTheme') === '1');
