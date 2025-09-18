document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const loginDropdown = document.getElementById('loginDropdown');
    if (loginBtn && loginDropdown) {
        loginBtn.onclick = (e) => {
            e.stopPropagation();
            loginDropdown.style.display = loginDropdown.style.display === 'none' ? 'block' : 'none';
        };
        document.addEventListener('click', (e) => {
            if (!loginDropdown.contains(e.target) && e.target !== loginBtn) {
                loginDropdown.style.display = 'none';
            }
        });
    }
});
