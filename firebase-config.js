// Ensure Firebase SDK is loaded before initialization
if (typeof firebase !== "undefined") {
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    // Expose Firebase globally
    window.firebase = firebase;
    window.auth = auth;
    window.db = db;
} else {
    console.error("Firebase SDK not loaded!");
}

    // Authentication functions
    function signIn() {
        let provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                console.log("Signed in:", result.user.displayName);
                updateUserStatus();
            })
            .catch((error) => {
                console.error("Sign-in error:", error.message);
            });
    }

    function signOut() {
        auth.signOut()
            .then(() => {
                console.log("Signed out");
                updateUserStatus();
            })
            .catch((error) => {
                console.error("Sign-out error:", error.message);
            });
    }

    // Update UI based on authentication state
    function updateUserStatus() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                document.getElementById("userStatus").innerText = `Signed in as ${user.displayName}`;
            } else {
                document.getElementById("userStatus").innerText = "Not Signed In";
            }
        });
    }

    // Ensure user status updates on page load
    updateUserStatus();
} else {
    console.error("Firebase SDK not loaded!");
}