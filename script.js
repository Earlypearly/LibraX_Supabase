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

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    messageDiv.className = 'message success';
    messageDiv.textContent = data.message;

    setTimeout(() => {
      window.location.href = `dashboard.html?name=${encodeURIComponent(email)}`;
    }, 1500);
  } catch (err) {
    messageDiv.className = 'message error';
    messageDiv.textContent = `❌ ${err.message}`;
  }
});
