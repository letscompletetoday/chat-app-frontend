import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpqn9MnpIVJPk4x4lBaoAfRMC0rAIVYTI",
    authDomain: "chat-app-85138.firebaseapp.com",
    databaseURL: "https://chat-app-85138.firebaseio.com",
    projectId: "chat-app-85138",
    storageBucket: "chat-app-85138.appspot.com",
    messagingSenderId: "524619290374",
    appId: "1:524619290374:web:17f9d25d78944d5777b087"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;