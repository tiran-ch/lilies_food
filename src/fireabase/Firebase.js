import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD9aAFMxvIVc-Nm9Uvd80QWD3Q-IlMeLAg",
    authDomain: "lilies-foo.firebaseapp.com",
    projectId: "lilies-foo",
    storageBucket: "lilies-foo.appspot.com",
    messagingSenderId: "998688552236",
    appId: "1:998688552236:web:4354ae0f5cfaca663fe889",
    measurementId: "G-RNG87BTF1G"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
