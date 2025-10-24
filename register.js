// register.js
const registerForm = document.getElementById('registerForm');
const messageDiv = document.getElementById('message');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get input values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  messageDiv.className = 'message';
  messageDiv.textContent = 'Registering...';

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text || "Invalid JSON response" };
    }

    if (!res.ok) throw new Error(data.error || `Server error (${res.status})`);

    messageDiv.className = 'message success';
    messageDiv.textContent = data.message || 'Registration successful!';

    // Redirect to login after 2s
    setTimeout(() => {
      window.location.href = '/index.html';
    }, 2000);
  } catch (err) {
    console.error('Register error:', err);
    messageDiv.className = 'message error';
    messageDiv.textContent = `❌ ${err.message}`;
  }
});
