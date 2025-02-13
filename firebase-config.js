// Ensure Firebase is loaded before initialization
if (typeof firebase !== 'undefined') {
    const firebaseConfig = {
        apiKey: "AIzaSyDnvXMxZAUqGIoc3VJGBU3LGJGoyJp3x9k",
        authDomain: "palladium-970d7.firebaseapp.com",
        projectId: "palladium-970d7",
        storageBucket: "palladium-970d7.firebasestorage.app",
        messagingSenderId: "1017691426124",
        appId: "1:1017691426124:web:eb55e79525c44a318b93e9"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

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