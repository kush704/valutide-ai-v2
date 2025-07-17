import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eykktxifpkjmidhgodxm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5a2t0eGlmcGtqbWlkaGdvZHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MjgxNDUsImV4cCI6MjA2ODMwNDE0NX0.JDhb2CKKw2bVoy4mMVJgLPY7stYSbymPEICufOYZe6k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
