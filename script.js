function rollDice() {
    let numDice = parseInt(document.getElementById("numDice").value);
    let diceType = parseInt(document.getElementById("diceType").value);
    let modifier = parseInt(document.getElementById("modifier").value);

    let total = modifier;
    let results = [];

    for (let i = 0; i < numDice; i++) {
        let roll = Math.floor(Math.random() * diceType) + 1;
        results.push(roll);
        total += roll;
    }

    let rollText = `Rolled: ${results.join(", ")} (Modifier: ${modifier}) → Total: ${total}`;

    document.getElementById("rollResult").innerText = rollText;

    saveRollToHistory(rollText);
}

function saveRollToHistory(rollText) {
    let history = document.getElementById("rollHistory");
    let newEntry = document.createElement("li");
    newEntry.innerText = rollText;
    history.prepend(newEntry);

    if (window.supabase) {
        const user = window.supabase.auth.getUser();
        if (user) {
            window.supabase.from("rollHistory").insert([
                { user_id: user.id, roll: rollText, timestamp: new Date().toISOString() }
            ]);
        }
    }
}

function clearHistory() {
    document.getElementById("rollHistory").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log("🔄 Checking if Supabase is initialized...");

    if (!window.supabase || !window.supabase.auth) {
        console.error("❌ ERROR: Supabase is not initialized or `supabase.auth` is missing!");
        return;
    }

    console.log("✅ Supabase is properly initialized in script.js!");
    await updateUserStatus();
});

async function signIn() {
    if (!window.supabase || !window.supabase.auth) {
        console.error("❌ ERROR: Supabase is not initialized or `supabase.auth` is missing!");
        return;
    }

    try {
        console.log("🔄 Attempting to sign in with Google...");
        const { data, error } = await window.supabase.auth.signInWithOAuth({
            provider: "google",
        });

        if (error) {
            console.error("❌ Sign-in error:", error.message);
        } else {
            console.log("✅ Signed in:", data);
            await updateUserStatus();
        }
    } catch (err) {
        console.error("❌ Unexpected error in signIn:", err);
    }
}

async function signOut() {
    if (!window.supabase || !window.supabase.auth) {
        console.error("❌ ERROR: Supabase is not initialized or `supabase.auth` is missing!");
        return;
    }

    try {
        console.log("🔄 Attempting to sign out...");
        const { error } = await window.supabase.auth.signOut();
        if (error) {
            console.error("❌ Sign-out error:", error.message);
        } else {
            console.log("✅ Signed out");
            await updateUserStatus();
        }
    } catch (err) {
        console.error("❌ Unexpected error in signOut:", err);
    }
}

async function updateUserStatus() {
    if (!window.supabase || !window.supabase.auth) {
        console.error("❌ ERROR: Supabase is not initialized or `supabase.auth` is missing!");
        return;
    }

    try {
        console.log("🔄 Checking authentication status...");
        
        // Wait until `supabase.auth` is defined before calling `getUser()`
        while (!window.supabase.auth) {
            console.warn("⚠️ Waiting for `supabase.auth` to be available...");
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait for 500ms
        }

        const { data, error } = await window.supabase.auth.getUser();

        if (error) {
            console.error("❌ Error fetching user status:", error.message);
            return;
        }

        document.getElementById("userStatus").innerText = data.user
            ? `Signed in as ${data.user.email}`
            : "Not Signed In";

        console.log("✅ User status updated!", data.user);
    } catch (err) {
        console.error("❌ Unexpected error in updateUserStatus:", err);
    }
}
