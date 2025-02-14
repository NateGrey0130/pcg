// Ensure Supabase SDK is loaded before initializing
if (typeof window.supabase === "undefined") {
    console.error("❌ ERROR: Supabase SDK is NOT loaded!");
} else {
    console.log("✅ Supabase SDK Loaded!");
}

// Supabase Credentials
const SUPABASE_URL = "https://yeunnywtcwnhzaizjncw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlldW5ueXd0Y3duaHphaXpqbmN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0ODMyNDgsImV4cCI6MjA1NTA1OTI0OH0.5z2h2ND833OvDGmVX6i5_aO5gjx0AuH4k-CLFQp-hEw";

try {
    // Initialize Supabase Client with session persistence
    window.supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: true, autoRefreshToken: true }
    });

    console.log("✅ Supabase Initialized!", window.supabase);

    // Ensure `supabase.auth` is available
    if (window.supabase && window.supabase.auth) {
        console.log("✅ Supabase.auth is available!", window.supabase.auth);
    } else {
        console.error("❌ ERROR: supabase.auth is undefined!");
    }
} catch (error) {
    console.error("❌ Supabase Initialization Failed:", error);
}
