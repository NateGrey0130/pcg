// Import Supabase (if using ES6 modules)
const SUPABASE_URL = "https://yeunnywtcwnhzaizjncw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlldW5ueXd0Y3duaHphaXpqbmN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0ODMyNDgsImV4cCI6MjA1NTA1OTI0OH0.5z2h2ND833OvDGmVX6i5_aO5gjx0AuH4k-CLFQp-hEw";

// Initialize Supabase Client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Expose globally
window.supabase = supabase;

console.log("✅ Supabase Initialized!");
