const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  messageDiv.className = 'message';
  messageDiv.textContent = '';

  try {
        const res = await fetch('https://your-api.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }

    const data = await res.json();
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
