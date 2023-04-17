import axios from "axios";

export const createHttpClient = () => {
    const baseURL = process.env.REACT_APP_ENV == 'development' ? process.env.REACT_APP_BACKEND_BASEURL_LOCAL : process.env.REACT_APP_BACKEND_BASEURL;
    return axios.create({
        baseURL: baseURL,
        withCredentials: false
    }); 
}

