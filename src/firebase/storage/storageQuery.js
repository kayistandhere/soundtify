import { getDownloadURL, StorageReference, uploadBytes } from "firebase/storage";
import { userAvartaPath } from './storagePath.js';
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

export const getAvartaUser = (images) =>{
    const userAvartaPath = ref(firebase.storage , `User/${firebase.auth.currentUser.uid}/avatar`)
    userAvartaPath.firebase.storage.listAll().then((result) =>{
        const url = result.items[0].downloadURL;
        console.log("Check avatar = " , url);
        images.src = url;

    })
}