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

    if (firebase.auth().currentUser) {
        db.collection("rollHistory").add({
            user: firebase.auth().currentUser.uid,
            roll: rollText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
}

function clearHistory() {
    document.getElementById("rollHistory").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", () => {
    if (!window.auth) {
        console.error("❌ Firebase Authentication is not available!");
        return;
    }
    
    updateUserStatus();
});

async function signIn() {
    const { user, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
    });

    if (error) {
        console.error("❌ Sign-in error:", error.message);
    } else {
        console.log("✅ Signed in:", user);
        updateUserStatus();
    }
}

async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("❌ Sign-out error:", error.message);
    } else {
        console.log("✅ Signed out");
        updateUserStatus();
    }
}

async function updateUserStatus() {
    const { data: { user } } = await supabase.auth.getUser();
    
    document.getElementById("userStatus").innerText = user
        ? `Signed in as ${user.email}`
        : "Not Signed In";
}

document.addEventListener("DOMContentLoaded", updateUserStatus);
