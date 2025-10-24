import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kvavhykbqpndnaajbdqv.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2YXZoeWticXBuZG5hYWpiZHF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDcwNTE4NCwiZXhwIjoyMDc2MjgxMTg0fQ.hkQiPU2pFgvsmmpO9L7xJVS_2bLV66WbUgI9S9OmBUs';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const app = express();

// ✅ Enable CORS for your frontend domain
app.use(cors({
  origin: [
    'https://libra-x-supabase.vercel.app',
    /\.vercel\.app$/  // allow all vercel preview URLs
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));


app.use(express.json());

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error || !data) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ message: `Welcome, ${data.name}!` });
});

app.listen(3000, () => console.log('✅ Server listening on port 3000'));
