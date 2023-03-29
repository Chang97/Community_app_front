import React, { useState, useEffect, useCallback } from "react";
import * as authAction from './auth_action';
let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    userObj: { username: '' },
    isLoggedIn: false,
    isSuccess: false,
    isGetSuccess: false,
    signup: (username, email, password) => { },
    login: (username, password) => { },
    logout: () => { },
    getUser: () => { },
    changePassword: (exPassword, newPassword) => { }
});

export const AuthContextProvider = (props) => {
    const tokenData = authAction.retrieveStoredToken();
    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }
    const [token, setToken] = useState(initialToken);
    const [userObj, setUserObj] = useState({
        username: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [isGetSuccess, setIsGetSuccess] = useState(false);
    const userIsLoggedIn = !!token;
    
    const signupHandler = (username, email, password) => {
        setIsSuccess(false);
        const response = authAction.signupActionHandler(username, email, password);
        response.then((result) => {
            if (result !== null) {
                setIsSuccess(true);
            }
        });
    };
    const loginHandler = (username, password) => {
        setIsSuccess(false);
        console.log(isSuccess);
        const data = authAction.loginActionHandler(username, password);
        data.then((result) => {
            if (result !== null) {
                const loginData = result.data;
                setToken(loginData.accessToken);
                logoutTimer = setTimeout(logoutHandler, authAction.loginTokenHandler(loginData.accessToken, loginData.tokenExpiresIn));
                setIsSuccess(true);
                console.log(isSuccess);
            }
        });
    };
    const logoutHandler = useCallback(() => {
        setToken('');
        authAction.logoutActionHandler();
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);
    const getUserHandler = () => {
        setIsGetSuccess(false);
        const data = authAction.getUserActionHandler(token);
        data.then((result) => {
            if (result !== null) {
                console.log('get user start!');
                const userData = result.data;
                setUserObj(userData);
                setIsGetSuccess(true);
            }
        });
    };
    const changePaswordHandler = (exPassword, newPassword) => {
        setIsSuccess(false);
        const data = authAction.changePasswordActionHandler(exPassword, newPassword, token);
        data.then((result) => {
            if (result !== null) {
                setIsSuccess(true);
                logoutHandler();
            }
        });
    };
    useEffect(() => {
        if (tokenData) {
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);
    const contextValue = {
        token,
        userObj,
        isLoggedIn: userIsLoggedIn,
        isSuccess,
        isGetSuccess,
        signup: signupHandler,
        login: loginHandler,
        logout: logoutHandler,
        getUser: getUserHandler,
        changePassword: changePaswordHandler
    };
    return (
        <AuthContext.Provider value={contextValue}>
        {props.children}
        </AuthContext.Provider>
    );
};
export default AuthContext;
