import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import {
  getFirestore,
  updateDoc,
  doc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { firebaseConfig } from "./firebaseConfig";
import { toast } from "react-toastify";

// const firebaseConfig = {};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCred.user);
      setIsLoggedIn(true);
      return userCred.user;
    } catch (error) {
      toast.info(error);
      setIsLoggedIn(false);
    }
  };

  const signup = async (email, password) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCred.user);
      setIsLoggedIn(true);
      return userCred.user;
    } catch (error) {
      toast.info("Email already used");
      setIsLoggedIn(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      setUser(userCred.user);
      setIsLoggedIn(true);
      return userCred.user;
    } catch (error) {
      toast.info(error);
      setIsLoggedIn(false);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const userCred = await signInWithPopup(auth, facebookProvider);
      setUser(userCred.user);
      setIsLoggedIn(true);
      return userCred.user;
    } catch (error) {
      toast.info(error);
      setIsLoggedIn(false);
    }
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };

  const signInWithPhone = async (phoneNumber) => {
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    );
    window.confirmationResult = confirmationResult;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsLoggedIn(false);
  };

  return {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
    signInWithGoogle,
    signInWithFacebook,
    signInWithPhone,
  };
};
//   try {
//     const userCred = await signInWithEmailAndPassword(auth, email, password);
//     isLoggedIn = true;
//     return userCred.user;
//   } catch (error) {
//     console.log(error);
//     isLoggedIn = false;
//   }
// };

// export const signup = async (email, password) => {
//   try {
//     const userCred = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     isLoggedIn = true;
//     return userCred.user;
//   } catch (error) {
//     console.log(error);
//     isLoggedIn = false;
//   }
// };

// export const logout = async () => {
//   await signOut(auth);
//   isLoggedIn = false;
// };

export const addToDb = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "users"), { ...data });
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    toast.info("Error adding document: ", e);
    // console.error("Error adding document: ", e);
  }
};

export const getDoc = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot;
};

export const update = async (userRole, id) => {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, { role: userRole });
    toast.info("Document updated successfully");
    getDoc()
  } catch (e) {
    toast.info("Error adding document: ", e);
  }
};
