import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxXXRwNlFBc3LUVYO_LDvTtmdv50GSrH4",
    authDomain: "slack-clone-81f6c.firebaseapp.com",
    databaseURL: "https://slack-clone-81f6c.firebaseio.com",
    projectId: "slack-clone-81f6c",
    storageBucket: "slack-clone-81f6c.appspot.com",
    messagingSenderId: "298105109726",
    appId: "1:298105109726:web:3fb31ce4aa45791d80d64f",
    measurementId: "G-6LMBJN4CMM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;