
import firebase from "../../firebase";
import { ref } from "firebase/storage";


const userRef = ref(firebase.storage , 'User')

const userAvartaPath = ref(firebase.storage , `User/${firebase.auth.currentUser.uid}/avatar`)


export default {
    userRef,
    userAvartaPath
}