const registerForm = document.getElementById('registerForm');
const messageDiv = document.getElementById('message');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  messageDiv.className = 'message';
  messageDiv.textContent = 'Creating your account...';

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const text = await res.text();
    console.log("Raw response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text || "Invalid JSON response" };
    }

    if (!res.ok) {
      throw new Error(data.error || `Server error (${res.status})`);
    }

    messageDiv.className = 'message success';
    messageDiv.textContent = data.message || 'Registration successful!';

    // Redirect to login after success
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  } catch (err) {
    console.error("Register error:", err);
    messageDiv.className = 'message error';
    messageDiv.textContent = `❌ ${err.message}`;
  }
});
