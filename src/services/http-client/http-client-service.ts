import axios from "axios";

export const createHttpClient = () => axios.create({
    baseURL: 'https://appbysuntek.online/api/',
});
 
export const createHttpClientWithAuthTokenAdded = (auth_token: string) => axios.create({
    baseURL: 'https://appbysuntek.online/api/',
    headers: { 'auth-token': auth_token }
});