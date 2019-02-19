import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyA_cwQ0Zl4H4MTgYrKIZL7TvXWbF8UGlig",
    authDomain: "tournament-generator-8f97d.firebaseapp.com",
    databaseURL: "https://tournament-generator-8f97d.firebaseio.com",
    projectId: "tournament-generator-8f97d",
    storageBucket: "tournament-generator-8f97d.appspot.com",
    messagingSenderId: "575164236280"
})
const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;