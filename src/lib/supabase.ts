import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kzdxxwznkjwblthpeige.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6ZHh4d3pua2p3Ymx0aHBlaWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MzU4MzMsImV4cCI6MjA4NDQxMTgzM30.2He_4rbidGwYXlBQDeqdYmqAxJOf6ebJ0PKbDUs6K4g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
