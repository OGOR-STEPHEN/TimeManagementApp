import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);

// Create account
  export const signupUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Reset password
  export const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

console.log("Auth helpers loaded");