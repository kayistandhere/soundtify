import { getDownloadURL, StorageReference, uploadBytes , ref , listAll } from "firebase/storage";
import firebase from '../../firebase.js';
/**
 * This function returns an object containing a URL and token. To obtain a normal URL, please utilize the {@link convertFireStorageUrl} function.
 * @public
 * @param ref - {@link StorageReference} where data should be uploaded.
 * @param file - data to store.It must be {@link Blob}, {@link Uint8Array} or {@link ArrayBuffer}
 * 
 * Example:
 * const uploadResult = await uploadSingleFile(userReference, avatar)
 * const url = convertFireStorageUrl(uploadResult)
 */
export const uploadSingleFile = async (ref, file) => {
    const uploadResult = await uploadBytes(ref, file);
    const url = await getDownloadURL(uploadResult.ref)
    const parseUrl = url.split("&token=");
    return {
        url: parseUrl[0],
        token: parseUrl[1]
    }
};

export const getAvatarUser = async () =>{
    const userAvatarRef = ref(firebase.storage, `User/${firebase.auth.currentUser.uid}/avatar/`);
    const file = (await listAll(userAvatarRef)).items[0];
 const data = await getDownloadURL(file);
 return data;
}