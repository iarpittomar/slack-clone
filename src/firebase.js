import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDczNqivbMbq6RTRjkpe0QIZzfoHdk5X00",
    authDomain: "slack-9e96a.firebaseapp.com",
    projectId: "slack-9e96a",
    storageBucket: "slack-9e96a.appspot.com",
    messagingSenderId: "345797607635",
    appId: "1:345797607635:web:1deb3c2014e5fad6215426",
    measurementId: "G-RHHQN2E7T3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider, db };