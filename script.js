const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  messageDiv.className = 'message';
  messageDiv.textContent = 'Logging in...';

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // Log full raw response for debugging
    console.log("Response status:", res.status);

    const text = await res.text(); // Get raw text (in case JSON parsing fails)
    console.log("Raw response:", text);

    let data;
    try {
      data = JSON.parse(text); // Try to parse JSON safely
    } catch {
      data = { error: text || "Invalid JSON response" };
    }

    if (!res.ok) {
      console.error("Backend error:", data.error || data);
      throw new Error(data.error || `Server error (${res.status})`);
    }

    console.log("Success response:", data);
    messageDiv.className = 'message success';
    messageDiv.textContent = data.message || "Login successful";

    setTimeout(() => {
      window.location.href = `dashboard.html?name=${encodeURIComponent(email)}`;
    }, 1500);
  } catch (err) {
    console.error("Caught error:", err);
    messageDiv.className = 'message error';
    messageDiv.textContent = `❌ ${err.message}`;
  }
});
