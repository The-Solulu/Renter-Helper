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
        console.log(d);
        return d;
    } else {
        console.log("No such document!");
        return null; // Return null or some other value to indicate document doesn't exist
    }
}

export async function get_test_person() {
    const db = getFirestore(app);
    const docRef = doc(db, "Renter", "Test");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const d = docSnap.data();
        return d;
    } else {
        console.log("No such document!");
        return null; // Return null or some other value to indicate document doesn't exist
    }
}

export const test_home = {
    address: '999 Mission St',
    price: 5000,
    bedrooms: 4,
    bathrooms: 2.5,
    petPolicy: true,
    smokingPolicy: false,
    availability: Date.now(),
    leaseLength: '12-Month Lease',
    imageUri: 'https://reactjs.org/logo-og.png',
    conversations: [],
};

export async function new_home(home) {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "Home"), {
    });
    await setDoc(doc(db, "Home", "docRef.id"), {
        id: docRef.id,
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
        conversations: [],
    });
}

export async function get_random_home() {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "Home"));
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    const randomDoc = querySnapshot.docs[randomIndex];
    return randomDoc.data();
}

export async function modify_home(home) {
    const db = getFirestore(app);
    const docRef = doc(db, "Home", home.id);
    await setDoc(docRef, {
        address: home.address,
        price: home.price,
        bedrooms: home.bedrooms,
        bathrooms: home.bathrooms,
        petPolicy: home.petPolicy,
        smokingPolicy: home.smokingPolicy,
        availability: home.availability,
        leaseLength: home.leaseLength,
        imageUri: home.imageUri,
    });
}

export const test_person = {
    name: 'Frank',
    bed_time: '10:30 PM',
    bio: 'I am a software engineer',
    disliked_users: [],
    liked_users: [],
    guests: 0,
    imageUri: 'https://reactjs.org/logo-og.png',
    interests: ['Reading', 'Coding', 'Hiking'],
    major: 'Computer Science',
    noise_level: 3,
    pets: false,
    pronouns: 'he/him',
    roommates: 3,
    smoking: false,
    wake_time: '6:30 AM',
    tidiness: 1,
    conversations: [],
};

export async function new_person(person) {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "Renter"), {
    });
    await setDoc(doc(db, "Renter", "docRef.id"), {
        id: docRef.id,
        name: person.name,
        bed_time: person.bed_time,
        bio: person.bio,
        disliked_users: [],
        liked_users: [],
        guests: person.guests,
        imageUri: person.imageUri,
        interests: person.interests,
        major: person.major,
        noise_level: person.noise_level,
        pets: person.pets,
        pronouns: person.pronouns,
        roommates: person.roommates,
        smoking: person.smoking,
        wake_time: person.wake_time,
        tidiness: person.tidiness,
        conversations: [],
    });
}

export async function modify_person(person) {
    const db = getFirestore(app);
    const docRef = doc(db, "Renter", person.id);
    await setDoc(docRef, {
        name: person.name,
        bed_time: person.bed_time,
        bio: person.bio,
        guests: person.guests,
        imageUri: person.imageUri,
        interests: person.interests,
        major: person.major,
        noise_level: person.noise_level,
        pets: person.pets,
        pronouns: person.pronouns,
        roommates: person.roommates,
        smoking: person.smoking,
        wake_time: person.wake_time,
        tidiness: person.tidiness
    });
}

export async function get_random_person() {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "Renter"));
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    const randomDoc = querySnapshot.docs[randomIndex];
    return randomDoc.data();
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

async function add_conversation_to_user(user_id, user_type, conversation_id) {
    const db = getFirestore(app);
    const docRef = doc(db, user_type, user_id);
    await updateDoc(docRef, {
        "conversations": arrayUnion(conversation_id),
    });
}

export async function new_conversation(user1_id, user1_type, user2_id, user2_type) {
    const db = getFirestore(app);
    const converstion_ref = await addDoc(collection(db, "Conversations"));
    add_conversation_to_user(user1_id, user1_type, converstion_ref.id);
    add_conversation_to_user(user2_id, user2_type, converstion_ref.id);
    return converstion_ref.id; 
}

export async function send_message(conversation_id, message) {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, `Conversations/${conversation_id}/messages`), {
        message: message,
        time: Date.now(),
        user_id: user_id,
        user_tyype: user_type,
    });
}

function compare_messages(a, b) {
    if (a.time < b.time) {
        return -1;
    }
    if (a.time > b.time) {
        return 1;
    }
    return 0;
}

export async function get_conversation(conversation_id){
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, `Conversations/${conversation_id}/messages`));
    var messages = [];

    querySnapshot.forEach((doc) => {
        messages.append(doc.data());
    });

    messages.sort(compare_messages);
    
    return messages;
}
