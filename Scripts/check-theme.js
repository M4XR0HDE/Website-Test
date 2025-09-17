// Instantly set theme before page renders to prevent white flash
if (localStorage.getItem('darkTheme') === '1') {
  document.documentElement.classList.add('dark-theme');
}
