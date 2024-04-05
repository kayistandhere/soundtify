import { collection } from "firebase/firestore";
import firebase from "../../firebase.js";

const userColection = collection(firebase.database , 'User');

const artistColection = collection(firebase.database , 'Artist');

export  {
    userColection,
    artistColection,
}