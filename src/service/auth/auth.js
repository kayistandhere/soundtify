
import firebaseAuth  from "../../firebase.ts";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  updateProfile,
} from "firebase/auth";

const signIn = (email, password) => {
    return setPersistence(firebaseAuth.auth,browserLocalPersistence ).then(() => {
      return signInWithEmailAndPassword(firebaseAuth.auth, email, password);
    }).catch((error) =>{
      console.log(error);
    })
};

const signUp = async (name, email, password) => {
  try {
    await updateProfile(firebaseAuth.auth.currentUser, { displayName: name });
    return createUserWithEmailAndPassword(firebaseAuth.auth, email, password);
  } catch (error) {
    console.log(error);
  }
};
const signWithGoogle = () => {
   return setPersistence(firebaseAuth.auth,browserLocalPersistence).then(() =>{
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        return signInWithPopup(firebaseAuth.auth, provider)
    }).catch((error) =>{
        console.log("loi = " , error);
    })
};

const sendEmail = (email) => {
  return sendPasswordResetEmail(firebaseAuth.auth, email);
};

const logout = () => {
  return signOut(firebaseAuth.auth);
};

export default {
  signUp,
  signIn,
  signWithGoogle,
  sendEmail,
  logout,
};
