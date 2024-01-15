type User ={
    email: string;
    password: string;
}
type CurrentToken = {
    accessToken: string,
    refreshToken: string
}
type UserList = {
    id: 8,
    username: string ;
    role: string;
    thumbnail: string;
    email: string;
    isActive: boolean;
}
type ChangePassword = {
    id: number;
    password_old: string;
    password_new: string;
}
