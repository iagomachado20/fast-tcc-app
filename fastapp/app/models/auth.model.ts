export interface UserAccess {
    email: string;
    password: string;
}

export enum UserType {
    Establishment = 0,
    Client = 1
}