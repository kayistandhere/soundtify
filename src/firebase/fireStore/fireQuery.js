import { doc, getDoc, getDocs, query, setDoc, runTransaction, deleteDoc ,updateDoc } from "firebase/firestore"
import { userColection, artistColection , songColection , subscriptionPlans } from './firePath.js'
import firebase from '../../firebase.js'

// User----------------------------------------------------------------------------------------
export const addUser = async (user) => {
    const docfire = doc(userColection, `${user.uuid}`);
    await setDoc(docfire, user);
}
export const updateUserClient = async (name , email ,gender , phone , age ,avatar) => {
    const indexUser = firebase.auth.currentUser.uid
    const docRef = doc(userColection ,`${indexUser}`)
    await setDoc(docRef,{
        "name": name, 
        "email": email, 
        "gender": gender, 
        "phone": phone, 
        "age": age,
        "avatar": avatar
    }).then(() => {
        console.log("Document updated successfully!");
    })
        .catch((error) => {
            console.error("Error updating document:", error);
        });
}
export const getUserById = async (id) => {
    try {
      const userRef = doc(userColection, id);
      const docSnapshot = await getDoc(userRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      } else {
        console.warn(`User with ID "${id}" not found in Firestore.`);
        return null; 
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
export const getAllUser = async () => {
    let snapshot = await getDocs(
        query(
            userColection
        )
    )
    return snapshot.docs.map((e) => (e.data()))
}
// Not working this function
export const getUser = async () =>{
   const snapshot = await getDoc(doc(userColection , firebase.auth.currentUser.uid))
   console.log("with data",snapshot.data());
   return snapshot.data();
}
// Artist----------------------------------------------------------------------------------------
export const getArtist = async () =>{
    const snapshot = await getDoc(doc(artistColection , firebase.auth.currentUser.uid))
    return snapshot.data();
 }
export const registerAsArtist = async (artist, user) => {
    try {
        await runTransaction(firebase.database, async (transaction) => {
            user.artistId = artist.id
            await transaction.update(doc(userColection, user.uuid), user)
            console.log("userColec" , doc(userColection, user.uuid));
            artist.uid = user.uuid
            await transaction.set(doc(artistColection, artist.id ),artist)
            console.log("userColec" , doc(artistColection, artist.id));
        });
        console.log("Transaction successfully committed!");
    } catch (error) {
        console.log("Transaction failed: ", error);
    }
}
export const getAllArtist = async () => {
    let snapshot = await getDocs(
        query(
            artistColection
        )
    )
    return snapshot.docs.map((e) => (e.data()))
}
export const getArtistById = async (id) => {
    const docfire = doc(artistColection, id)
    const data = await getDoc(docfire)
    return data.data()
}
// Song----------------------------------------------------------------------------------------
export const uploadSong = async (song) => (await setDoc(doc(songColection, song.id), song))

export const updateSong = async (song) => {
    const docRef = doc(songColection ,song.id)
    await updateDoc(docRef,song).then(() => {
        console.log("Document updated successfully!");
    })
        .catch((error) => {
            console.error("Error updating document:", error);
        });
}
export const deleteSong = async (id) =>{
    return deleteDoc(doc(songColection , id)).then((res) =>{
        console.log("successfull" ,res);
    }).catch((error) =>{
        console.log("fasle" , error);
    })
}
export const getAllSong = async () => {
    let snapshot = await getDocs(
        query(
            songColection
        )
    )
    return snapshot.docs.map((e) => (e.data()))
}
export const getSongById = async (id) => {
    try {
        const docRef = doc(songColection , id);
        const docSnapshot = await getDoc(docRef);
        if(docSnapshot.exists()){
            return docSnapshot.data();
        } else {
            console.warn(`Song with id ${id} not found in fireStore`);
            return null;
        }
    } catch (error) {
        console.log("Error not fetching song data" , error);
        throw error;
    }
}
export const getSongByArtist = async (artistId) =>{
    try {
        // const docRef = doc(songColection , id);
        const songQuery = query(doc(songColection), where('artistId', '==', artistId));
        const docSnapshot = await getDoc(songQuery);
        if(docSnapshot.exists()){
            return docSnapshot.data();
        } else {
            console.warn(`Song with id ${id} not found in fireStore`);
            return null;
        }
    } catch (error) {
        console.log("Error not fetching song data" , error);
        throw error;
    }
}
// subscriptionPlan----------------------------------------------------------------------------------------
export const getAllSubscriptionPlans = async () => {
    let snapshot = await getDocs(
        query(
            subscriptionPlans
        )
    )
    return snapshot.docs.map((e) => (e.data()))
}
export const getSubPlantById = async (id) => {
    const docfire = doc(subscriptionPlans, id)
    const data = await getDoc(docfire)
    return data.data()
}
