import { createClient } from '@supabase/supabase-js';
const supadb = 'https://xllxwolwxgzsemvzbuyj.supabase.co';
const supakey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsbHh3b2x3eGd6c2VtdnpidXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3ODQ2NzgsImV4cCI6MjA1OTM2MDY3OH0.D_IQ7Iue2bzOWGW8MV8qS3TK7R4v-OzQ1QQDyatBaCM';

export const supabase = createClient(supadb, supakey);