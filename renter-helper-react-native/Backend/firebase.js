import "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

/**
 * Get all the collections in the database
 */
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

/**
 * Create a new user with the given email and password
 * @param {*} email Email of the user
 * @param {*} password Password of the user
 */
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

/**
 * Sign in with the given email and password
 * @param {*} email 
 * @param {*} password 
 */
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

/**
 * Get a test home object from the database
 * @returns Home object
 */
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

/**
 * Get a test person object from the database
 * @returns Person object
 */
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

// Example of home object structure
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

/**
 * Create a new home object in the database
 * @param {*} home 
 */
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

/**
 * Get a random home object from the database
 * @returns {Promise<Home>}
 */
export async function get_random_home() {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "Home"));
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    const randomDoc = querySnapshot.docs[randomIndex];
    return randomDoc.data();
}

/**
 * Edit the given home object in the database
 * @param {*} home 
 */
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

/**
 * Get the home object with the given id
 * @param {*} id user id of the home
 * @returns home object
 */
export async function get_home(id) {
    const db = getFirestore(app);
    const docRef = doc(db, "Home", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const d = docSnap.data();
        return d;
    } else {
        console.log("No such document!");
        return null; // Return null or some other value to indicate document doesn't exist
    }
}

// Example of person object structure
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

/**
 * Create a new person object in the database
 * @param {*} person 
 */
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

/**
 * Edit the given person object in the database
 * @param {*} person 
 */
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

/**
 * Get a random person object from the database
 * @returns {Promise<Person>}
 */
export async function get_random_person() {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "Renter"));
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    const randomDoc = querySnapshot.docs[randomIndex];
    return randomDoc.data();
}

/**
 * Get the person object with the given id
 * @param {*} id user id of the person
 * @returns person object
 */
export async function get_renter(id) {
    const db = getFirestore(app);
    const docRef = doc(db, "Renter", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const d = docSnap.data();
        return d;
    } else {
        console.log("No such document!");
        return null; // Return null or some other value to indicate document doesn't exist
    }
}

/**
 * Like a user
 * @param {*} id user id
 * @param {*} primary_user_type user type of the person liking, can be "Renter" or "Home"
 * @param {*} liked_user_id user id of the person being liked
 */
export async function like(id, primary_user_type, liked_user_id) {
    const db = getFirestore(app);
    const docRef = doc(db, primary_user_type, id);
    await updateDoc(frankDocRef, {
        "liked_users": arrayUnion(liked_user_id),
    });
}

/**
 * Dislike a user
 * @param {*} id user id
 * @param {*} primary_user_type user type of the person disliking, can be "Renter" or "Home"
 * @param {*} disliked_user_id user id of the person being disliked
 */
export async function dislike(id, primary_user_type, disliked_user_id) {
    const db = getFirestore(app);
    const docRef = doc(db, primary_user_type, id);
    await updateDoc(frankDocRef, {
        "disliked_users": arrayUnion(disliked_user_id),
    });
}

/**
 * link a conversation to a user
 * @param {*} user_id user id
 * @param {*} user_type user type of the person, can be "Renter" or "Home"
 * @param {*} conversation_id document id of the conversation
 */
async function add_conversation_to_user(user_id, user_type, conversation_id) {
    const db = getFirestore(app);
    const docRef = doc(db, user_type, user_id);
    await updateDoc(docRef, {
        "conversations": arrayUnion(conversation_id),
    });
}

/**
 * create a new conversation between two users. This function will also link the conversation to the users.
 * @param {\} user1_id user id of the first user
 * @param {*} user1_type user type of the first user can be "Renter" or "Home"
 * @param {*} user2_id user id of the second user
 * @param {*} user2_type user type of the second user can be "Renter" or "Home"
 * @returns conversation id
 */
export async function new_conversation(user1_id, user1_type, user2_id, user2_type) {
    const db = getFirestore(app);
    const converstion_ref = await addDoc(collection(db, "Conversations"));
    add_conversation_to_user(user1_id, user1_type, converstion_ref.id);
    add_conversation_to_user(user2_id, user2_type, converstion_ref.id);
    return converstion_ref.id;
}

/**
 * send a message to a conversation
 * @param {*} conversation_id conversation id
 * @param {*} message the message to be sent
 * @param {*} author_id user id of the author
 * @param {*} author_type user type of the author can be "Renter" or "Home"
 */
export async function send_message(conversation_id, message, author_id, author_type) {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, `Conversations/${conversation_id}/messages`), {
        message: message,
        time: Date.now(),
        user_id: author_id,
        user_type: author_type,
    });
}

/**
 * Compare two messages based on their time
 * @param {*} a message a
 * @param {*} b message b
 * @returns 1 if message a is newer, -1 if message b is newer, 0 if they are the same
 */
function compare_messages(a, b) {
    if (a.time < b.time) {
        return -1;
    }
    if (a.time > b.time) {
        return 1;
    }
    return 0;
}

const test_message = {
    message: 'Hello', // message content
    time: Date.now(), // time in milliseconds
    user_id: 'test', // user id of the author
    user_type: 'Renter', // can be "Renter" or "Home"
};

/**
 * Get the conversation for the given conversation id
 * @param {*} conversation_id conversation id
 * @returns array of messages
 */
export async function get_conversation(conversation_id) {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, `Conversations/${conversation_id}/messages`));
    var messages = [];

    querySnapshot.forEach((doc) => {
        messages.append(doc.data());
    });

    messages.sort(compare_messages);

    return messages;
}

/**
 * Save the user id to firebase
 * @param {*} image image to be uploaded
 * @param {*} user_id user id of the user
 * @returns url of the uploaded image
 */
export function upload_image(image, user_id) {
    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${user_id}`);
    uploadBytes(storageRef, image)
        .then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    const url = getDownloadURL(storageRef);
    return url;
}
