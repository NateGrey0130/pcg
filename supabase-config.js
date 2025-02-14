// Ensure Supabase SDK is available
if (typeof window.supabase === "undefined") {
    const SUPABASE_URL = "https://yeunnywtcwnhzaizjncw.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlldW5ueXd0Y3duaHphaXpqbmN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0ODMyNDgsImV4cCI6MjA1NTA1OTI0OH0.5z2h2ND833OvDGmVX6i5_aO5gjx0AuH4k-CLFQp-hEw";

    try {
        // Initialize Supabase Client
        window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("✅ Supabase Initialized!");
    } catch (error) {
        console.error("❌ Supabase Initialization Failed:", error);
    }
}
