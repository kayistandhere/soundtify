
import firebase from "../../firebase.js";
import { ref } from "firebase/storage";


export const userRef = ref(firebase.storage , 'User')
