const USERS_KEY = "oibsip-auth-users";
const SESSION_KEY = "oibsip-auth-session";

/* =========================
   STORAGE HELPERS
========================= */

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentSession() {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
}

/* =========================
   MESSAGE HELPERS
========================= */

function showError(elementId, message) {
    const element = document.getElementById(elementId);

    if (element) {
        element.textContent = message;
    }
}

function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);

    if (element) {
        element.textContent = message;
    }
}

function clearMessages() {
    const errorElements = document.querySelectorAll(".error-message");
    const successElements = document.querySelectorAll(".success-message");

    errorElements.forEach(element => {
        element.textContent = "";
    });

    successElements.forEach(element => {
        element.textContent = "";
    });
}

/* =========================
   PASSWORD
========================= */

function validatePassword(password) {
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);

    return hasMinLength && hasNumber;
}

async function hashPassword(password) {
    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    const hashArray = Array.from(
        new Uint8Array(hashBuffer)
    );

    return hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

/* =========================
   REGISTER
========================= */

async function registerUser(event) {
    event.preventDefault();

    clearMessages();

    const usernameInput =
        document.getElementById("registerUsername");

    const passwordInput =
        document.getElementById("registerPassword");

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username) {
        showError(
            "registerError",
            "Username or email is required."
        );
        return;
    }

    if (!password) {
        showError(
            "registerError",
            "Password is required."
        );
        return;
    }

    if (!validatePassword(password)) {
        showError(
            "registerError",
            "Password must be at least 8 characters long and contain at least one number."
        );
        return;
    }

    const users = getUsers();

    const existingUser = users.find(
        user =>
            user.username.toLowerCase() ===
            username.toLowerCase()
    );

    if (existingUser) {
        showError(
            "registerError",
            "An account with this username or email already exists."
        );
        return;
    }

    const passwordHash =
        await hashPassword(password);

    const newUser = {
        id: crypto.randomUUID(),
        username,
        passwordHash
    };

    users.push(newUser);

    saveUsers(users);

    showSuccess(
        "registerSuccess",
        "Registration successful."
    );

    document.getElementById("registerForm").reset();
}

/* =========================
   LOGIN
========================= */

async function loginUser(event) {
    event.preventDefault();

    clearMessages();

    const username =
        document.getElementById("loginUsername")
            .value
            .trim();

    const password =
        document.getElementById("loginPassword")
            .value;

    if (!username || !password) {
        showError(
            "loginError",
            "Please enter your username and password."
        );
        return;
    }

    const users = getUsers();

    const user = users.find(
        item =>
            item.username.toLowerCase() ===
            username.toLowerCase()
    );

    if (!user) {
        showError(
            "loginError",
            "Invalid username or password."
        );
        return;
    }

    const enteredHash =
        await hashPassword(password);

    if (enteredHash !== user.passwordHash) {
        showError(
            "loginError",
            "Invalid username or password."
        );
        return;
    }

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
            userId: user.id
        })
    );

    window.location.href =
        "dashboard.html";
}

/* =========================
   DASHBOARD
========================= */

function protectDashboard() {
    const session = getCurrentSession();

    if (!session) {
        window.location.href = "index.html";
        return;
    }

    const users = getUsers();

    const currentUser = users.find(
        user => user.id === session.userId
    );

    if (!currentUser) {
        localStorage.removeItem(
            SESSION_KEY
        );

        window.location.href =
            "index.html";

        return;
    }

    const welcomeMessage =
        document.getElementById("welcomeMessage");

    if (welcomeMessage) {
        welcomeMessage.textContent =
            `Welcome, ${currentUser.username}!`;
    }
}

/* =========================
   LOGOUT
========================= */

function logoutUser() {
    localStorage.removeItem(
        SESSION_KEY
    );

    window.location.href =
        "index.html";
}

/* =========================
   EVENT LISTENERS
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const registerForm =
            document.getElementById(
                "registerForm"
            );

        if (registerForm) {
            registerForm.addEventListener(
                "submit",
                registerUser
            );
        }

        const loginForm =
            document.getElementById(
                "loginForm"
            );

        if (loginForm) {
            loginForm.addEventListener(
                "submit",
                loginUser
            );
        }

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );

        if (logoutBtn) {
            logoutBtn.addEventListener(
                "click",
                logoutUser
            );
        }

        if (
            window.location.pathname.includes(
                "dashboard.html"
            )
        ) {
            protectDashboard();
        }
    }
);