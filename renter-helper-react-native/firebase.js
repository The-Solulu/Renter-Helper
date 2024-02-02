import "firebase/database";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from 'firebase/app';

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

const getCollections = async () => {
    try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "Renter"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    } catch (error) {
        console.log(error);
    }
};




export default getCollections;
