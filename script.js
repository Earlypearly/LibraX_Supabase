// Initialize Supabase
// Replace these with your Supabase project details
const SUPABASE_URL = 'https://kvavhykbqpndnaajbdqv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2YXZoeWticXBuZG5hYWpiZHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDUxODQsImV4cCI6MjA3NjI4MTE4NH0.JIuhvuvZMsUW_Re1lq0A1UexpTGznyquthb0Q987Dkc';
//amazing
// Create Supabase client
const { createClient } = supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Get form and message elements
const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

// Handle form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Clear previous messages
    messageDiv.className = 'message';
    messageDiv.textContent = '';
    
    try {
        // Query the 'users' table in Supabase
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password', password)
            .single();
        
        if (error || !data) {
            // No matching credentials found
            messageDiv.className = 'message error';
            messageDiv.textContent = '❌ Invalid email or password';
            return;
        }
        
        // Credentials match
        messageDiv.className = 'message success';
        messageDiv.textContent = '✓ Login successful! Welcome ' + data.name;
        
        // Optional: Redirect after successful login
        setTimeout(() => {
            // Pass user's name as URL parameter to dashboard.html
            window.location.href = `dashboard.html?name=${encodeURIComponent(data.name)}`;
        }, 1500);

        
    } catch (err) {
        console.error('Error:', err);
        messageDiv.className = 'message error';
        messageDiv.textContent = '⚠ An error occurred. Please try again.';
    }
});
