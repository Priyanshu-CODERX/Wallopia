import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCrVnxzCn6n0EhiULz9BT04ZjRGovFqE5w",
    authDomain: "wallopia2.firebaseapp.com",
    projectId: "wallopia2",
    storageBucket: "wallopia2.appspot.com",
    messagingSenderId: "996973710312",
    appId: "1:996973710312:web:86533d17b2627e9967725d"
};
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth;

export { db, auth }