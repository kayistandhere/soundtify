import { collection } from "firebase/firestore";
import firebase from "../../firebase.js";

const userColection = collection(firebase.database , 'User');

const artistColection = collection(firebase.database , 'Artist');

const songColection = collection(firebase.database, 'Song');

const subscriptionPlans = collection(firebase.database , 'SubscriptionPlans');

const playList = collection(firebase.database , 'Playlist');

const tagMetaData = collection(firebase.database , 'TagsMetaData')

const  followCollection = collection(firebase.database , 'Follow')

const sentimentCollection = collection(firebase.database, 'Sentiment')
export  {
    userColection,
    artistColection,
    songColection,
    subscriptionPlans,
    playList,
    tagMetaData,
    followCollection,
    sentimentCollection
}