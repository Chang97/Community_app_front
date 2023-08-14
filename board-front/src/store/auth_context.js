import React, { useState, useEffect, useCallback } from "react";
import * as authAction from './auth_action';
let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    userObj: {},
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
        id: '',
        username: '',
        email: '',
        role: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [isGetSuccess, setIsGetSuccess] = useState(false);
    const userIsLoggedIn = !!token;
    
    const signupHandler = (username, email, password) => {
        //debugger;
        setIsSuccess(false);
        const response = authAction.signupActionHandler(username, email, password);
        response.then((result) => {
            setIsSuccess(!!result);
        });
    };
    const loginHandler = (username, password) => {
        setIsSuccess(false);
        const data = authAction.loginActionHandler(username, password);
        data.then((result) => {
            if (result !== null) {
                const loginData = result.data;
                setToken(loginData.accessToken);
                logoutTimer = setTimeout(logoutHandler, authAction.loginTokenHandler(loginData.accessToken, loginData.tokenExpiresIn));
                setIsSuccess(true);
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
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token : token,
        userObj : userObj,
        isLoggedIn: userIsLoggedIn,
        isSuccess : isSuccess,
        isGetSuccess : isGetSuccess,
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
