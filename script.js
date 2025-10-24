const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Basic validation
  if (!email || !password) {
    messageDiv.className = 'message error';
    messageDiv.textContent = '⚠️ Please fill in all fields.';
    return;
  }

  messageDiv.className = 'message';
  messageDiv.textContent = '🔄 Logging in...';

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response status:", res.status);

    const raw = await res.text();
    console.log("Raw response:", raw);

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      data = { error: raw || "Invalid JSON response" };
    }

    if (!res.ok) {
      console.error("Backend error:", data.error || data);
      throw new Error(data.error || `Server error (${res.status})`);
    }

    // Success
    console.log("Success response:", data);
    messageDiv.className = 'message success';
    messageDiv.textContent = data.message || "✅ Login successful!";

    // Redirect after short delay
    setTimeout(() => {
      window.location.href = `dashboard.html?name=${encodeURIComponent(email)}`;
    }, 1500);

  } catch (err) {
    console.error("Caught error:", err);
    messageDiv.className = 'message error';
    messageDiv.textContent = `❌ ${err.message}`;
  }
});
