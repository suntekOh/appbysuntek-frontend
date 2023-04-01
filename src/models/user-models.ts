export interface UserDto {
    userId: string
    password: string
    email: string,
}

export interface SignedInUser {
    userId: string,
    authToken: string
}
