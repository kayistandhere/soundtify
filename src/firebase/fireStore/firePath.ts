import { collection } from "firebase/firestore";
import firebase from "../../firebase";


const userColection = collection(firebase.database , 'User')

export default {
    userColection
}