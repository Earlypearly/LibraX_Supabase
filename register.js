import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://kvavhykbqpndnaajbdqv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2YXZoeWticXBuZG5hYWpiZHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDUxODQsImV4cCI6MjA3NjI4MTE4NH0.JIuhvuvZMsUW_Re1lq0A1UexpTGznyquthb0Q987Dkc';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const registerForm = document.getElementById('registerForm');
const messageDiv = document.getElementById('message');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  messageDiv.className = 'message';
  messageDiv.textContent = '';

  const { data, error } = await supabase.from('users').insert([{ name, email, password }]);

  if (error) {
    messageDiv.className = 'message error';
    messageDiv.textContent = '❌ Registration failed: ' + error.message;
    return;
  }

  messageDiv.className = 'message success';
  messageDiv.textContent = '✓ Registration successful! Redirecting to login...';

  setTimeout(() => {
    window.location.href = 'index.html'; // Redirect to login page
  }, 1500);
});
