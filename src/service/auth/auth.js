import auth from "../../firebase.js";
import { signInWithEmailAndPassword , GoogleAuthProvider , signInWithPopup , sendPasswordResetEmail , signOut , createUserWithEmailAndPassword ,updateProfile } from "firebase/auth";


const signIn = (email, password) => {
   return  signInWithEmailAndPassword(auth.auth , email , password);
}

const signUp = async (name , email , password) => {
    await updateProfile(auth.auth.currentUser, {displayName : name });
    return createUserWithEmailAndPassword(auth.auth, email, password);
}

const signWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return signInWithPopup(auth.auth, provider)
}

const sendEmail = (email) => {
    return sendPasswordResetEmail(auth.auth , email);
}

const logout = () => {
   return signOut(auth.auth);
}

export default {
    signUp,
    signIn,
    signWithGoogle,
    sendEmail,
    logout,
}