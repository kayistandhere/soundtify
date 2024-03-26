import queryAuth from '../firebase/fireStore/fireQuery'
// BaseRepository (assuming its definition exists elsewhere)

abstract class BaseRepository {
    // ... methods and properties of BaseRepository
  }
  
  // LoginMethodProvider
  abstract class LoginMethodProvider {
    constructor() {}
  }
  
  // EmailAndPasswordLoginProvider
  class EmailAndPasswordLoginProvider extends LoginMethodProvider {
    constructor(public readonly email: string, public readonly password: string) {
      super();
    }
  }
  
  // GoogleLoginProvider
  class GoogleLoginProvider extends LoginMethodProvider {
    constructor() {
      super();
    }
  }
  // GitHubLoginProvider (assuming it's similar to GoogleLoginProvider)
  class GitHubLoginProvider extends LoginMethodProvider {
    constructor() {
      super();
    }
  }
  
  // AuthRepository
  abstract class AuthRepository extends BaseRepository {
    abstract signIn(loginMethodProvider: LoginMethodProvider): Promise<boolean>;
  
    abstract signOut(): Promise<boolean>;
  
    abstract signUp(
      email: string,
      password: string,
      name: string,
      age: string,
      gender: string
    ): Promise<boolean>;
  
    abstract sync(): Promise<void>;
  
    abstract get isLoggedIn(): boolean;
  
    abstract resetPassword(email: string): Promise<void>;
  
    abstract getEmailFromOobCode(code: string): Promise<string | null>;
  
    abstract updatePassword(code: string, newPassword: string): Promise<void>;
  
    abstract get user(): User | null; // Assuming User is defined elsewhere
  }
  