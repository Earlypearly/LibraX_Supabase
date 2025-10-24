import express from 'express';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kvavhykbqpndnaajbdqv.supabase.co';
const SUPABASE_SERVICE_KEY = 'your-service-role-or-secret-key'; // Keep secret

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const app = express();
app.use(express.json());

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error || !data) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ message: `Welcome, ${data.name}!` });
});

app.listen(3000, () => console.log('Server listening on port 3000'));
