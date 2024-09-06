document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

    // Here you would typically send this data to a server
    // For now, we'll just store it in localStorage
    const user = { name, email, password, phone };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful! Please log in.");
    window.location.href = "login.html";
});