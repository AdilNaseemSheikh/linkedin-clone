// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf1m88mL7Ws4rLkClz2Tx3b1mxprrUiLY",
  authDomain: "linkedin-clone-74049.firebaseapp.com",
  projectId: "linkedin-clone-74049",
  storageBucket: "linkedin-clone-74049.appspot.com",
  messagingSenderId: "330224720104",
  appId: "1:330224720104:web:076813ff538893a18b115d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
