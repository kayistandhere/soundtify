import { doc, setDoc } from 'firebase/firestore'
import userColection from './firePath'
const addUser = (user : User) =>{
    const colection = userColection.userColection
    const docfire = doc(colection, user.uuid)
    setDoc(docfire , user)
}

// do 2 trường này không được để null
addUser({email:'', name: ''})



export default {
    addUser,
}
