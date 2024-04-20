import { doc, getDoc, getDocs, query, setDoc, runTransaction } from "firebase/firestore"
import { userColection, artistColection } from './firePath.js'
import firebase from '../../firebase.js'

export const addUser = async (user) => {
    const docfire = doc(userColection, `${user.uuid}`);
    await setDoc(docfire, user);
}
export const updateUser = async (name , email ,gender , phone , age) => {
    const indexUser = firebase.auth.currentUser.uid
    const docRef = doc(userColection ,`${indexUser}`)
    await setDoc(docRef,{
        "name": name, 
        "email": email, 
        "gender": gender, 
        "phone": phone, 
        "age": age
    }).then(() => {
        console.log("Document updated successfully!");
    })
        .catch((error) => {
            console.error("Error updating document:", error);
        });

}
export const getUser = async () =>{
   const snapshot = await getDoc(doc(userColection , firebase.auth.currentUser.uid))
   return snapshot.data();
}

// trickger
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
export const getUserById = async (id) => {
    const docfire = doc(userColection, id)
    const data = await getDoc(docfire)
    return data.data()
}

export const getArtistById = async (id) => {
    const docfire = doc(artistColection, id)
    const data = await getDoc(docfire)
    return data.data()
}

export const uploadSong = async (song) => (await setDoc(doc(songCollection, song.id), song))

export const getAllSong = async () => {
    let snapshot = await getDocs(
        query(
            songCollection
        )
    )
    return snapshot.docs.map((e) => (e.data()))
}