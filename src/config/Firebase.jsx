import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJVBG8MbEyGpp9EUsTcdK_9eq74XPOoCI",
  authDomain: "fir-world-wise.firebaseapp.com",
  projectId: "fir-world-wise",
  storageBucket: "fir-world-wise.appspot.com",
  messagingSenderId: "326484549787",
  appId: "1:326484549787:web:4eec49d8201f82293e263e",
  measurementId: "G-VCNDR7V0RX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
