import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.VITE_SUPABASE_URL;
// const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseKey);
const supabaseUrl = 'https://imkzbxoltgkqtiyzksnr.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlta3pieG9sdGdrcXRpeXprc25yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNTE5MjUsImV4cCI6MjAzMjYyNzkyNX0.EpXHo3G85fM4QNpR0xypcPdZbA3yzuav1tr--5-LsvU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
