// Example: src/services/authService.js
import { auth } from '../firebase/firebase.config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Function to sign in a user
const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Function to create a new user
const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export { signInUser, createUser };
