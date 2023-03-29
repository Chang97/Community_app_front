import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth_context';

const MainNavigation = () => {
    const authCtx = useContext(AuthContext);
    const [username, setUsername] = useState('');
    let isLogin = authCtx.isLoggedIn;
    let isGet = authCtx.isGetSuccess;

    const callback = (str) => {
        setUsername(str);
    };

    useEffect(() => {
        if (isLogin) {
            console.log('start');
            authCtx.getUser();
        }
        // eslint-disable-next-line
    }, [isLogin]);

    useEffect(() => {
        
        if (isGet) {
            console.log('get start');
            callback(authCtx.userObj.username);
        }
        // eslint-disable-next-line
    }, [isGet]);

    const toggleLogoutHandler = () => {
        authCtx.logout();
    };
    
    return (
        <div>
            <ul className="nav justify-content-end">
                <li className="nav-link">
                    {!isLogin && <Link to='/login'>Login</Link>}
                </li>
                <li className="nav-link">
                    {!isLogin && <Link to='signup'>Sign-Up</Link>}
                </li>
                <li className="nav-link">
                    {isLogin && <Link to='/profile'>{username}</Link>}
                </li>
                <li className="nav-link">
                    {isLogin && <p onClick={toggleLogoutHandler}>Logout</p>}
                </li>
            </ul>
        </div>
        );
};

export default MainNavigation;