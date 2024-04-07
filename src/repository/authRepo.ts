
// import { BaseRepository } from "../core/base/baseRepository/base-repository";

// // LoginMethodProvider
// export abstract class LoginMethodProvider {
//   constructor() {}
// }

// // EmailAndPasswordLoginProvider
// export class EmailAndPasswordLoginProvider extends LoginMethodProvider {
//   constructor(public readonly email: string, public readonly password: string) {
//     super();
//   }
// }

// // GoogleLoginProvider
// export class GoogleLoginProvider extends LoginMethodProvider {
//   constructor() {
//     super();
//   }
// }
// // GitHubLoginProvider constructor
// export class GitHubLoginProvider extends LoginMethodProvider {
//   constructor() {
//     super();
//   }
// }

// // AuthRepository
// export abstract class AuthRepository extends BaseRepository {
//   abstract signIn(loginMethodProvider: LoginMethodProvider): Promise<boolean>;

//   abstract signOut(): Promise<boolean>;

//   abstract signUp(
//     email: string,
//     password: string,
//     name: string,
//     age: string,
//     gender: string
//   ): Promise<boolean>;

//   // abstract sync(): Promise<void>;

//   // abstract get isLoggedIn(): boolean;

//   abstract resetPassword(email: string): Promise<void>;

//   abstract getEmailFromOobCode(code: string): Promise<string | null>;

//   abstract updatePassword(code: string, newPassword: string): Promise<void>;

//   abstract get user(): User | null; // Assuming User is defined elsewhere
// }
