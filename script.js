document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const darkModeToggle = document.getElementById("dark-mode");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const contact = document.getElementById("contact").value;

            if (!validateEmail(email) || !validatePassword(password) || !validateContact(contact)) {
                document.getElementById("signup-error").innerText = "Invalid credentials!";
                return;
            }

            localStorage.setItem(email, JSON.stringify({ password, contact }));
            alert("Signup successful! Please login.");
            window.location.href = "login.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            const user = JSON.parse(localStorage.getItem(email));
            if (user && user.password === password) {
                localStorage.setItem("loggedInUser", email);
                window.location.href = "dashboard.html";
            } else {
                document.getElementById("login-error").innerText = "Invalid email or password!";
            }
        });
    }

    if (document.getElementById("user-email")) {
        document.getElementById("user-email").innerText = localStorage.getItem("loggedInUser");
        document.getElementById("logout").addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "index.html";
        });
    }

    // Dark Mode Toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
        });
    }
});

// Validation Functions
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function validateContact(contact) {
    return /^[0-9]{10,12}$/.test(contact);
}
