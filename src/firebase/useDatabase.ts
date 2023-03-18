import { ref, set, get, child } from "firebase/database"
import { db } from './config'
import { UserDataModel } from '../store/interfaces' 

export const writeData = (uid: string, data: UserDataModel) => {
  set(ref(db, 'users/' + uid), data)
}

export const getData = (uid: string) => {
  get(child(ref(db), `users/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}
