import { collection } from "firebase/firestore";
import firebase from "../../firebase.js";

const userColection = collection(firebase.database , 'User');

const artistColection = collection(firebase.database , 'Artist');

const songColection = collection(firebase.database, 'Song');

export  {
    userColection,
    artistColection,
}