import { doc, getDoc, getDocs, query, setDoc, runTransaction,addDoc,arrayUnion, deleteDoc ,updateDoc ,where} from "firebase/firestore"
import { userColection, artistColection , songColection , subscriptionPlans , playList , tagMetaData } from './firePath.js'
import firebase from '../../firebase.js'

// User----------------------------------------------------------------------------------------
export const addUser = async (user) => {
    const docfire = doc(userColection, `${user.uuid}`);
    await setDoc(docfire, user);
}
export const updateUserClient = async (name , email ,gender , phone , age ,avatar) => {
    const indexUser = firebase.auth.currentUser.uid
    const docRef = doc(userColection ,`${indexUser}`)
    await updateDoc(docRef,{
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
            artist.uid = user.uuid
            await transaction.set(doc(artistColection, artist.id ),artist)
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
export const getArtistByName = async (name) => {
    try {
        const docRef = query(artistColection , where('name' , '==' , name) );
        const docSnapshot = await getDocs(docRef);
        if(docSnapshot.exists()){
            return docSnapshot.data();
        } else {
            console.warn(`Artist with name ${name} not found in fireStore`);
            return null;
        }
    } catch (error) {
        console.log("Error not fetching song data" , error);
    }
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
    }
}
export const getSongByName = async (name) => {
    try {
        const docRef = query(songColection , where('name' , '==' , name) );
        const docSnapshot = await getDocs(docRef);
        return docSnapshot.docs.map((e) => (e.data()))
    } catch (error) {
        console.log("Error not fetching song data" , error);
    }
}
export const getSongByArtist = async (artistId) =>{
    try {
        const songQuery = query(songColection, where('artistId', '==', artistId));
        const docSnapshot = await getDocs(songQuery);
            return docSnapshot.docs.map((e) => (e.data()))
    } catch (error) {
        console.log("Error not fetching song data" , error);
    }
}
export const getSongsWithArray = async (songIds) => {
    try {
      if (!Array.isArray(songIds)) {
        throw new Error('songIds must be an array of strings');
      }
      const songQuery = query(songColection, where('id', 'in', songIds));
      const docSnapshots = await getDocs(songQuery);
      const songs = docSnapshots.docs.map((doc) => doc.data());
      return songs;
    } catch (error) {
      console.log("Error fetching song data:", error);
    }
  };
export const getSongByTag = async (value) => {
    try {
        const tagQuery = query(songColection , where('tags' , "array-contains-any" , value))
        const docSnapshot = await getDocs(tagQuery);
        return docSnapshot.docs.map((e) => (e.data())) 
    } catch (error) {
        console.error("Error not fetching song data",error);
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
// Playlist................................................................................................
export const createPlaylist = async (playlist) => (await setDoc(doc(playList, playlist.id), playlist))

export const getAllPlaylist = async () => {
    let snapshot = await getDocs(
        query(
            playList
        )
    )
    return snapshot.docs.map((e) => (e.data()))
}
export const getPlaylistById = async (id) => {
    const docfire = doc(playList, id)
    const data = await getDoc(docfire)
    return data.data()
}
export const getPlaylistWithUser = async (id) => {
    try {
      const playlistQuery = query(playList , where('extraData.ownerId' , "==" , id));
      const docSnapshot = await getDocs(playlistQuery);
        return docSnapshot.docs.map((e) => (e.data()))
    } catch (error) {
      console.error("Error fetching song data:", error);
      throw error;
    }
  }
  export const deletePlaylist = async (id) =>{
    return deleteDoc(doc(playList , id)).then((res) =>{
        console.log("successfull" ,res);
    }).catch((error) =>{
        console.log("fasle" , error);
    })
}
export const updatePlaylist = async (playlist, idSong) => {
    console.log(`playlist ${playlist.id} && id song = ${idSong}`);
    try {
      const docRef = doc(playList, playlist.id);
      await updateDoc(docRef, {
        "songs": arrayUnion(idSong)
      });
      console.log("Song successfully added to playlist!");
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };
//b1 lấy dữ liệu của của playlist đó cùng với id của bài hát đang chọn update vào songs của playlist ;
//b2 show dữ liệu lên playlist có các nhạc trong playlist đó
//b3 sau đó chỉnh sửa hàm getPlaylistById (id) là id của userid để show đúng playlist của người đó ;

//   TagMetaData ---------------------------------------------------------------------------------------

export const getAllTag = async () => {
    let snapshot = await getDocs(
        query(
            tagMetaData
        )
    )
    return snapshot.docs.map((e) => (e.data()))
}
//  Search ----------------------------------------------------------------------------------------------
export const search = async (values) => {
    try {
                switch (values) {
                    case values:
                        if(values.charAt(0) == '#'){
                           return getSongByTag([values.slice(1)])
                        }    
                    case values:
                        return await getSongByName(values)
                    default:
                        console.log("some error");
                        break;
                }
    } catch (error) {
        console.log("Error not fetching song data" , error);
        throw error;
    }
}