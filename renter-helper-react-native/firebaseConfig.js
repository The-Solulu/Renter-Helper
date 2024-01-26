import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCAh3Rz9Z98dDWO8VZA0OegaQriGKgf7NE",
  authDomain: "renter-helper-d752c.firebaseapp.com",
  projectId: "renter-helper-d752c",
  storageBucket: "renter-helper-d752c.appspot.com",
  messagingSenderId: "733942461222",
  appId: "1:733942461222:web:e0ece75df01398eee987e7",
  measurementId: "G-KE29DR5HLB"
};

const app = initializeApp(firebaseConfig);

export default app;

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
