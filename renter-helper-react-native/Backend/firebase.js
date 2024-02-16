import "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
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

export const getCollections = async () => {
    try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "Home"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    } catch (error) {
        console.log(error);
    }
};

// Documentation: https://firebase.google.com/docs/auth/web/password-auth?hl=en&authuser=0
export function create_user_with(email, password) {
    const auth = getAuth(app);

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            return user;
        })
        .catch((error) => {
            // Error
            console.log(error);
            return error;
        });
}

export function sign_in_with(email, password) {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            return user;
        })
        .catch((error) => {
            // Error
            console.log(error);
            return error;
        });
}

export async function get_test_home() {
    const db = getFirestore(app);
    const docRef = doc(db, "Home", "test");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const d = docSnap.data();
        return d;
    } else {
        console.log("No such document!");
        return null; // Return null or some other value to indicate document doesn't exist
    }
}

const test_home = {
    address: '999 Mission St',
    price: 5000,
    bedrooms: 4,
    bathrooms: 2.5,
    petPolicy: true,
    smokingPolicy: false,
    availability: Date.now(),
    leaseLength: '12-Month Lease',
    imageUri: 'https://reactjs.org/logo-og.png',
};

export async function new_home(home) {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "Home"), {
    });
    await setDoc(doc(db, "Home", "docRef.id"), {
        id : docRef.id,
        address: home.address,
        price: home.price,
        bedrooms: home.bedrooms,
        bathrooms: home.bathrooms,
        petPolicy: home.petPolicy,
        smokingPolicy: home.smokingPolicy,
        availability: home.availability,
        leaseLength: home.leaseLength,
        imageUri: home.imageUri,
        liked_users: [],
        disliked_users: [],
    });
}

export async function like(id, liked_user_id) {
    const db = getFirestore(app);
    const docRef = doc(db, "Home", id);
    await updateDoc(frankDocRef, {
        "liked_users": arrayUnion(liked_user_id),
    });
}

export async function dislike(id, disliked_user_id) {
    const db = getFirestore(app);
    const docRef = doc(db, "Home", id);
    await updateDoc(frankDocRef, {
        "disliked_users": arrayUnion(disliked_user_id),
    });
}

export default { getCollections, create_user_with, sign_in_with, get_test_home };
