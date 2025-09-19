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

function showRegisterForm() {
    const container = document.createElement('div');
    container.className = 'login-dropdown';
    container.style.position = 'absolute';
    container.style.right = '30px';
    container.style.top = '140px';
    container.innerHTML = `
        <label for="regUsername">Username:</label>
        <input type="text" id="regUsername" name="regUsername" placeholder="Username">
        <label for="regPassword">Password:</label>
        <input type="password" id="regPassword" name="regPassword" placeholder="Password">
        <button id="registerSubmit" class="login-btn">Register</button>
        <button id="registerCancel" class="login-btn" style="background:#eee;color:#222;">Cancel</button>
        <div id="registerMsg" style="margin-top:8px;"></div>
    `;
    document.body.appendChild(container);
    document.getElementById('registerCancel').onclick = () => container.remove();
    document.getElementById('registerSubmit').onclick = async () => {
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        const msg = document.getElementById('registerMsg');
        if (!username || !password) {
            msg.textContent = 'Please enter both fields.';
            msg.style.color = 'red';
            return;
        }
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            msg.textContent = data.message;
            msg.style.color = data.success ? 'green' : 'red';
            if (data.success) setTimeout(() => container.remove(), 1200);
        } catch (e) {
            msg.textContent = 'Error connecting to server.';
            msg.style.color = 'red';
        }
    };
}

function showLoginForm() {
    const container = document.createElement('div');
    container.className = 'login-dropdown';
    container.style.position = 'absolute';
    container.style.right = '30px';
    container.style.top = '140px';
    container.innerHTML = `
        <label for="loginUsername">Username:</label>
        <input type="text" id="loginUsername" name="loginUsername" placeholder="Username">
        <label for="loginPassword">Password:</label>
        <input type="password" id="loginPassword" name="loginPassword" placeholder="Password">
        <button id="loginSubmit" class="login-btn">Login</button>
        <button id="loginCancel" class="login-btn" style="background:#eee;color:#222;">Cancel</button>
        <button id="registerFromLogin" class="login-btn" style="background:#4a90e2;color:#fff;margin-top:8px;">Register</button>
        <a href="#" id="forgotPassword" class="login-link">Forgot password?</a>
        <div id="loginMsg" style="margin-top:8px;"></div>
    `;
    document.body.appendChild(container);
    document.getElementById('loginCancel').onclick = () => container.remove();
    document.getElementById('loginSubmit').onclick = async () => {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const msg = document.getElementById('loginMsg');
        if (!username || !password) {
            msg.textContent = 'Please enter your name and password.';
            msg.style.color = 'red';
            return;
        }
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (!data.success) {
                msg.textContent = 'User or password is wrong.';
                msg.style.color = 'red';
            } else {
                msg.textContent = data.message;
                msg.style.color = 'green';
                setTimeout(() => container.remove(), 1200);
            }
        } catch (e) {
            msg.textContent = 'Error connecting to server.';
            msg.style.color = 'red';
        }
    };
    document.getElementById('forgotPassword').onclick = (e) => {
        e.preventDefault();
        showPasswordResetForm();
        container.remove();
    };
    document.getElementById('registerFromLogin').onclick = (e) => {
        e.preventDefault();
        showRegisterForm();
        container.remove();
    };
}

function showPasswordResetForm() {
    const container = document.createElement('div');
    container.className = 'login-dropdown';
    container.style.position = 'absolute';
    container.style.right = '30px';
    container.style.top = '140px';
    container.innerHTML = `
        <label for="resetUsername">Username:</label>
        <input type="text" id="resetUsername" name="resetUsername" placeholder="Username">
        <button id="resetSubmit" class="login-btn">Reset Password</button>
        <button id="resetCancel" class="login-btn" style="background:#eee;color:#222;">Cancel</button>
        <div id="resetMsg" style="margin-top:8px;"></div>
        <a href="#" id="registerFromReset" class="login-link" style="margin-top:12px;display:block;">Create an account</a>
    `;
    document.body.appendChild(container);
    document.getElementById('resetCancel').onclick = () => container.remove();
    document.getElementById('resetSubmit').onclick = async () => {
        const username = document.getElementById('resetUsername').value;
        const msg = document.getElementById('resetMsg');
        if (!username) {
            msg.textContent = 'Please enter your username.';
            msg.style.color = 'red';
            return;
        }
        // Demo: just show message, real implementation should send email or allow password change
        msg.textContent = 'If this username exists, you will receive password reset instructions.';
        msg.style.color = 'green';
        setTimeout(() => container.remove(), 2000);
    };
    document.getElementById('registerFromReset').onclick = (e) => {
        e.preventDefault();
        showRegisterForm();
        container.remove();
    };
}

// Add event to login dropdown link
window.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.login-link');
    links.forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            showRegisterForm();
        };
    });
    // Replace login dropdown with custom login/register/password reset
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.onclick = (e) => {
            e.stopPropagation();
            showLoginForm();
        };
    }
});
