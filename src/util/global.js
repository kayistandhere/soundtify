import firebase from "@/firebase.js";
import { httpsCallable } from "firebase/functions";
export const defaultAvatar = (value) => {
   return (value =
      value ??
      "https://firebasestorage.googleapis.com/v0/b/datn-578a6.appspot.com/o/DefaultAvatar%2FSonTung.jpg?alt=media&token=693157dc-641d-4fd2-9702-44d67f573dbe");
};
export const following = async (typeClient, id) => {
   try {
      console.log(`${typeClient} and follow ${id}`);
      const follow = httpsCallable(firebase.firebaseFunction, "followById");
      await follow({ type: typeClient, followId: id });
      return true;
   } catch (error) {
      console.log("follow error", error);
      return false
   }
};
export const unfollow = async (typeClient, follow) => {
   try {
      console.log(`${typeClient} and unfollow ${follow}`);
      const unfollow = httpsCallable(firebase.firebaseFunction, "unFollowById");
      await unfollow({ type: typeClient, id: follow });
      return null;
   } catch (error) {
      console.log("unfollow error", error);
      return true;
   }
};

export const totalListenCount = async (idClient) => {
   try {
      var listenCount = httpsCallable(firebase.firebaseFunction, "onPlaySongWithId");
      await listenCount({ id : idClient });
      return true;
   } catch (error) {
      console.log("unfollow error", error);
   }
}
