import { doc, getDoc, getDocs, query, setDoc, runTransaction } from "firebase/firestore"
import { userColection, artistColection } from './firePath.js'
import { collection } from "firebase/firestore"
import firebase from '../../firebase.js'

export const addUser = async (user) => {
    const docfire = doc(userColection, `${user.uuid}`);
    await setDoc(docfire, user);
}
export const updateUser = async (user) => {
    const indexUser = firebase.auth.currentUser.uid
    const docRef = doc(userColection ,`${indexUser}`)
    docRef.update({
        // name:`${user.name}` , email:`${user.email}`, gender: `${user.sex}` , phone:user.phone, "age":user.age 
        "name": user.name, 
        "email": user.email, 
        "gender": user.gender, 
        "phone": user.phone, 
        "age": user.age
    }).then(() => {
        console.log("Document updated successfully!");
    })
        .catch((error) => {
            console.error("Error updating document:", error);
        });

}
export const registerAsArtist = async (artist, user) => {
    try {
        await runTransaction(firebase.database, async (transaction) => {
            user.artistId = artist.id
            await transaction.update(doc(userColection, user.uuid), user)
            artist.uid = user.uuid
            await transaction.set(doc(artistColection, artist.id))
        });
        console.log("Transaction successfully committed!");
    } catch (e) {
        console.log("Transaction failed: ", e);
    }
}
export const getUserById = async (id) => {
    const docfire = doc(userColection, id)

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