export interface Credentials {
    username: string;
    password: string;
}

export interface LoggedInUser {
    id: string;
    email: string;
    username: string;
    role: string;
}

export interface IUser {
    _id: string;
    email: string;
    password: string;
    username: string;
    firstname?: string;
    lastname?: string;
    role?: string;
    address?: IAddress;
    phone?:IPhone[];
}

export interface IAddress{
    street?: string;
    streetNum?: string;
    postCode?: string;
    city?: string;
    country?: string;
}

export interface IPhone {
    type?: string;
    phoneNum?: string;
}

export interface invalidLoginState  {
    isInvalid: boolean;
    message: string;
}

export interface registrationStatus  {
    success: boolean;
    message: string;
  }

  export interface deletionStatus {
    success: boolean;
    message: string;
  }