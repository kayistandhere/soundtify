import { getDownloadURL, StorageReference, uploadBytes } from "firebase/storage";

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
const uploadSingleFile = async (ref, file) => {
    const uploadResult = await uploadBytes(ref, file);
    const url = await getDownloadURL(uploadResult.ref)
    const parseUrl = url.split("&token=");
    return {
        url: parseUrl[0],
        token: parseUrl[1]
    }
};

export default uploadSingleFile;