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
        console.log("🔍 Debug: Current Supabase object:", window.supabase);
        return;
    }

    console.log("✅ Supabase is properly initialized in script.js!");

    // Force refresh session before checking authentication
    await refreshSession();
    await updateUserStatus();
});

async function refreshSession() {
    console.log("🔄 Refreshing authentication session...");
    try {
        const { data, error } = await window.supabase.auth.refreshSession();
        if (error) {
            console.warn("⚠️ Warning: Unable to refresh session", error.message);
        } else {
            console.log("✅ Authentication session refreshed!", data);
        }
    } catch (err) {
        console.error("❌ Unexpected error in refreshSession:", err);
    }
}

async function updateUserStatus() {
    if (!window.supabase || !window.supabase.auth) {
        console.error("❌ ERROR: Supabase is not initialized or `supabase.auth` is missing!");
        return;
    }

    try {
        console.log("🔄 Checking authentication status...");

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
