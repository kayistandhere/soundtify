import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from "firebase/functions";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2vt1JipOAD0prmXscNem8YJ47bJ2TsPU",
    authDomain: "datn-578a6.firebaseapp.com",
    projectId: "datn-578a6",
    storageBucket: "datn-578a6.appspot.com",
    messagingSenderId: "972673057633",
    appId: "1:972673057633:web:87329c39dfdd10ecaafb20",
    measurementId: "G-CQVCW5P3BB"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore()
const auth = getAuth(app);
// Get a non-default Storage bucket
const storage = getStorage(app, "gs://datn-578a6.appspot.com");
const realTimeDatabase = getDatabase(app);
const firebaseFunction = getFunctions(app);
export default {
    database,
    auth,
    storage,
    firebaseFunction,
    realTimeDatabase,
}