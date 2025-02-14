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

    if (window.appwrite) {
        window.appwrite.account.get().then(user => {
            window.appwrite.database.createDocument("YOUR_DATABASE_ID", "rollHistory", {
                user_id: user.$id,
                roll: rollText,
                timestamp: new Date().toISOString()
            });
        }).catch(error => {
            console.error("❌ Error saving roll to Appwrite:", error);
        });
    }
}

function clearHistory() {
    document.getElementById("rollHistory").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log("🔄 Checking if Appwrite is initialized...");

    if (!window.appwrite || !window.appwrite.account) {
        console.error("❌ ERROR: Appwrite is not initialized!");
        return;
    }

    console.log("✅ Appwrite is properly initialized in script.js!");
    await updateUserStatus();
});

async function updateUserStatus() {
    if (!window.appwrite || !window.appwrite.account) {
        console.error("❌ ERROR: Appwrite is not initialized!");
        return;
    }

    try {
        console.log("🔄 Checking authentication status...");
        const user = await window.appwrite.account.get();
        document.getElementById("userStatus").innerText = user
            ? `Signed in as ${user.email}`
            : "Not Signed In";
        console.log("✅ User status updated!", user);
    } catch (error) {
        console.error("❌ Error fetching user status:", error);
    }
}

async function signIn() {
    try {
        console.log("🔄 Redirecting to Appwrite login...");
        await window.appwrite.account.createOAuth2Session("google");
    } catch (error) {
        console.error("❌ Sign-in error:", error);
    }
}

async function signOut() {
    try {
        await window.appwrite.account.deleteSession("current");
        console.log("✅ Signed out!");
        updateUserStatus();
    } catch (error) {
        console.error("❌ Sign-out error:", error);
    }
}