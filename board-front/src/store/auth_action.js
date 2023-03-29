import { GET, POST } from "./fetch_auth_action";

let BASE_URL = 'http://localhost:8000';

const createTokenHeader = (token) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
};

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
};

export const loginTokenHandler = (token, expirationTime) => {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', String(expirationTime));
    const remainingTime = calculateRemainingTime(expirationTime);
    return remainingTime;
};

export const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime') || '0';
    const remaingTime = calculateRemainingTime(+storedExpirationDate);
    if (remaingTime <= 1000) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }
    return {
        token: storedToken,
        duration: remaingTime
    };
};

export const signupActionHandler = (username, password, email) => {
    const URL = BASE_URL + '/auth/signup';
    const signupObject = {username, password, email};
    const response = POST(URL, signupObject, {});
    return response;
};

export const loginActionHandler = (username, password) => {
    const URL = BASE_URL + '/auth/login';
    const loginObject = { username, password };
    const response = POST(URL, loginObject, {});
    return response;
};

export const logoutActionHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
};

export const getUserActionHandler = (token) => {
    const URL = BASE_URL + '/user/me';
    const response = GET(URL, createTokenHeader(token));
    return response;
};

export const changePasswordActionHandler = (exPassword, newPassword, token) => {
    const URL = BASE_URL + '/user/password';
    const changePasswordObj = { exPassword, newPassword };
    const response = POST(URL, changePasswordObj, createTokenHeader(token));
    return response;
};
