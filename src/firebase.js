// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEkJkkyh6vsj6rKfexAojTTlIM2HJRt2s",
  authDomain: "test-20478.firebaseapp.com",
  projectId: "test-20478",
  storageBucket: "test-20478.appspot.com",
  messagingSenderId: "655657302949",
  appId: "1:655657302949:web:01e69c756d4eb5708d064c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

connectFirestoreEmulator(db, "localhost", 8080);
// const auth = getAuth();
// connectAuthEmulator(auth, "http://localhost:9099");

export let isLoggedIn = false;

const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");
// connectAuthEmulator(firestore, "http://localhost:8080");

export const login = async (email, password) => {
  console.log(email, password);
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    isLoggedIn = true;
    console.log(isLoggedIn);
    console.log(userCred.user);
    return userCred.user;
  } catch (error) {
    console.log(error);
    isLoggedIn = false;
  }
};

export const signup = async (email, password) => {
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCred.user);
    isLoggedIn = true;
    return userCred.user;
  } catch (error) {
    console.log(error);
    isLoggedIn = false;
  }
};

export const logout = async () => {
  await signOut(auth);
  isLoggedIn = false;
};

export const addToDb = async (data) => {
  console.log(data);
  try {
    const docRef = await addDoc(collection(db, "users"), { ...data });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getDoc = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    console.log(doc._document.data.value.mapValue.fields);
    console.log(`${doc.id} => ${doc.data()}`);
  });
};

getDoc();
