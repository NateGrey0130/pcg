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

function signIn() {
    if (window.auth) {
        let provider = new firebase.auth.GoogleAuthProvider();
        window.auth.signInWithPopup(provider)
            .then((result) => {
                console.log("Signed in:", result.user.displayName);
                updateUserStatus();
            })
            .catch((error) => {
                console.error("Sign-in error:", error.message);
            });
    } else {
        console.error("Firebase Authentication is not available!");
    }
}

function signOut() {
    if (window.auth) {
        window.auth.signOut()
            .then(() => {
                console.log("Signed out");
                updateUserStatus();
            })
            .catch((error) => {
                console.error("Sign-out error:", error.message);
            });
    } else {
        console.error("Firebase Authentication is not available!");
    }
}

function updateUserStatus() {
    if (window.auth) {
        window.auth.onAuthStateChanged((user) => {
            document.getElementById("userStatus").innerText = user 
                ? `Signed in as ${user.displayName}` 
                : "Not Signed In";
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateUserStatus();
});
