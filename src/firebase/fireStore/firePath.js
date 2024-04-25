import { collection } from "firebase/firestore";
import firebase from "../../firebase.js";

const userColection = collection(firebase.database , 'User');

const artistColection = collection(firebase.database , 'Artist');

const songColection = collection(firebase.database, 'Song');

const subscriptionPlans = collection(firebase.database , 'SubscriptionPlans');
export  {
    userColection,
    artistColection,
    songColection,
    subscriptionPlans
}