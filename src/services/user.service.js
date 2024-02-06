import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/test/";

const API_USER = "http://localhost:8082/user/";

const API_REDIRECT = "http://localhost:8082/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
    return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getUserUrls = () => {
    return axios.get(API_USER + "urls", { headers: authHeader() });
};

const postNewUrl = (originalUrl) => {
    return axios.post(
        API_REDIRECT + "url/generate",
        { original: originalUrl }, // Wrap the originalUrl in an object
        {
            headers: {
                ...authHeader(),
                "Content-Type": "application/json", // Set Content-Type header to JSON
            },
        }
    );
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    getUserUrls,
    postNewUrl,
    API_REDIRECT,
};

export default UserService;
