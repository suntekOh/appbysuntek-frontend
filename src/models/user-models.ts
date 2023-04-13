export interface UserDto {
    userName: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface AuthenticatedUser {
    userName: string,
}
