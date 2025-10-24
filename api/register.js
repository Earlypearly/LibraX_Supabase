// api/register.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kvavhykbqpndnaajbdqv.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Insert user
    const { error } = await supabase
      .from('users')
      .insert([{ name, email, password }]);

    if (error) throw error;

    return res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: err.message });
  }
}
