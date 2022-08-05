export interface IUser {
    id: number;
    username: string;
    full_name: string;
    birthday: Date;
    mail: string;
    roles: Roles;
}

interface Roles {
    id: number;
    roleName: string[];
}