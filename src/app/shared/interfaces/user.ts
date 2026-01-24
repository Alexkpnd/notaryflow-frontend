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
    email: string;
    password: string;
    username: string;
    firstname?: string;
    lastname?: string;
    role?: string;  // den kserw an prepei na mpei
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