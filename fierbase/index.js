// Import the functions you need from the SDKs you need
const fierbase = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCE7pcjrWhwUQ5c2kW3Ruz6LYMoByh4KOQ",
    authDomain: "flytographer-a1fa1.firebaseapp.com",
    projectId: "flytographer-a1fa1",
    storageBucket: "flytographer-a1fa1.appspot.com",
    messagingSenderId: "102411712644",
    appId: "1:102411712644:web:68f90357fc062ff736ead1"
};

// Initialize Firebase
const app = fierbase.initializeApp(firebaseConfig);

module.exports = app