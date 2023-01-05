import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "Enter__Your__API__Key",
  //TO get API key for firebase, please click this link: https://firebase.google.com/docs/projects/api-keys
  authDomain: "netflix-clone-90e73.firebaseapp.com",
  projectId: "netflix-clone-90e73",
  storageBucket: "netflix-clone-90e73.appspot.com",
  messagingSenderId: "1041948989565",
  appId: "1:1041948989565:web:8424611849f079ec44b914",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
