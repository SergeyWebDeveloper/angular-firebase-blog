export interface IFbCreateResponse {
  name: string;
}

export interface IFirebaseAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface IUser {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}


export interface IPost {
  id?: string;
  title: string;
  text: string;
  author: string;
  date: Date;
}

