document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Here you would typically verify credentials with a server
    // For now, we'll just check against localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
        localStorage.setItem("loggedIn", "true");
        alert("Login successful!");
        window.location.href = "appointment.html";
    } else {
        alert("Invalid credentials. Please try again.");
    }
});