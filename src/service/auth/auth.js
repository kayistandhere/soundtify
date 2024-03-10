import auth from "../../firebase.js";
import { signInWithEmailAndPassword , GoogleAuthProvider , signInWithPopup } from "firebase/auth";


const signIn = (email, password) => {
   return  signInWithEmailAndPassword(auth.auth , email , password);
}

const signWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return signInWithPopup(auth.auth, provider)
}



export default {
    signIn,
    signWithGoogle,
}