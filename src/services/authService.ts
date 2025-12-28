import { auth } from '../firebase/config';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser
} from 'firebase/auth';

export const authService = {
    login: (email: string, pass: string) => {
        return signInWithEmailAndPassword(auth, email, pass);
    },

    signup: (email: string, pass: string) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    },

    logout: () => {
        return signOut(auth);
    },

    subscribeToAuthChanges: (callback: (user: FirebaseUser | null) => void) => {
        return onAuthStateChanged(auth, callback);
    }
};
