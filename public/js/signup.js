document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    let data = await response.json();

    if (data.success) {
        alert("✅ OTP sent to your email. Please check and verify.");
        window.location.href = data.redirect; // ✅ Redirect to OTP Page
    } else {
        alert("❌ " + data.message);
    }
});
