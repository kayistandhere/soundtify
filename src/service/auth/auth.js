
import { httpsCallable } from "firebase/functions";
import firebaseAuth  from "../../firebase.js";
import { addUser } from '../../firebase/fireStore/fireQuery.js';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  updateProfile
  // updateEmail,
} from "firebase/auth";

const signIn = (email, password) => {
    return setPersistence(firebaseAuth.auth,browserLocalPersistence ).then(() => {
        return signInWithEmailAndPassword(firebaseAuth.auth, email, password);
    }).catch((error) =>{
      console.log(error);
    })
};
const signUp = async (name, email, password , gender , phone , age , follower , following) => {
  try {
    await createUserWithEmailAndPassword(firebaseAuth.auth, email, password);
    await updateProfile(firebaseAuth.auth.currentUser, { displayName: name });
    const uuid = firebaseAuth.auth.currentUser.uid;
    /// TODO: Ensure consistency between object properties in this line and the properties defined in Firestore. 
    /// Any discrepancies in object properties will lead to data synchronization issues across platforms. Please exercise caution.
    await addUser({"uuid":uuid ,"name":name , "email":email, "gender":gender , "phone":phone, "age":age , "follower":follower , "following": following })
    console.log(addUser);
  }catch (error){
    /// Signout if get error while signup
    firebaseAuth.auth.signOut();
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