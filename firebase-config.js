const firebaseConfig = {
    apiKey: "AIzaSyDnvXMxZAUqGIoc3VJGBU3LGJGoyJp3x9k",
    authDomain: "palladium-970d7.firebaseapp.com",
    projectId: "palladium-970d7",
    storageBucket: "palladium-970d7.firebasestorage.app",
    messagingSenderId: "1017691426124",
    appId: "1:1017691426124:web:eb55e79525c44a318b93e9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function signIn() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}

function signOut() {
    firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(user => {
    document.getElementById("userStatus").innerText = user ? `Signed in as ${user.displayName}` : "Not Signed In";
});
