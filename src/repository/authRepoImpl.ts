// import { AuthRepository, EmailAndPasswordLoginProvider, GoogleLoginProvider, LoginMethodProvider } from "./authRepo";
// import serviceAuth from '../service/auth/auth'
// import { GoogleAuthProvider } from "firebase/auth";
// import queryUser from '../firebase/fireStore/fireQuery'

// class AuthRepositoryImpl extends AuthRepository {
//   async  signIn(loginMethodProvider: LoginMethodProvider): Promise<boolean> {
//     try {
//         if(loginMethodProvider instanceof EmailAndPasswordLoginProvider){
//             await  serviceAuth.signIn(loginMethodProvider.email , loginMethodProvider.password)
//           }else if(loginMethodProvider instanceof GoogleLoginProvider){
//             await serviceAuth.signWithGoogle();
//           }
//     } catch (error) {
//            serviceAuth.signOut();
//            throw error;
//     }
//         return true;
//     }
//     async signOut(): Promise<boolean> {
//         await serviceAuth.signOut();
//         return true
//     }
//     async signUp(email: string, password: string, name: string, age: string, gender: string): Promise<boolean> {
//         const userExits =  serviceAuth.signUp(name , email , password)
//         if(userExits == null){
//             return false;
//         }else {
//            await queryUser.addUser({name : name ,email : email })
//         }
//        return true
//     }

//     async resetPassword(email: string): Promise<void> {
//         await serviceAuth.sendEmail(email);
//     }
//     getEmailFromOobCode(code: string): Promise<string> {
//         throw new Error("Method not implemented.");
//     }
//     updatePassword(code: string, newPassword: string): Promise<void> {
//         throw new Error("Method not implemented.");
//     }
//     get user(): User {
//         throw new Error("Method not implemented.");
//     }


// }