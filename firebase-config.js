// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDioPgfZOUyBXht6OkXmvs6Q8M-6KVQgO0",
    authDomain: "ttrpg-dice-roller.firebaseapp.com",
    projectId: "ttrpg-dice-roller",
    storageBucket: "ttrpg-dice-roller.firebasestorage.app",
    messagingSenderId: "81673731735",
    appId: "1:81673731735:web:489d81cf18fe6e165873d2"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication & Firestore
const auth = firebase.auth();
const db = firebase.firestore();

// Expose Firebase globally for use in other scripts
window.firebase = firebase;
window.auth = auth;
window.db = db;
