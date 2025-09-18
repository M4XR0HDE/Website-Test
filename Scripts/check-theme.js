// Instantly set theme before page renders to prevent white flash using cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

if (getCookie('darkTheme') === '1') {
  document.documentElement.classList.add('dark-theme');
}
