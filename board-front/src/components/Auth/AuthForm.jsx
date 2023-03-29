import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth_context';

const AuthForm = () => {
    const usernamelInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);

    const submitHandler = async (event) => {
        event.preventDefault();
        const enteredUsername = usernamelInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        setIsLoading(true);
        authCtx.login(enteredUsername, enteredPassword);
        setIsLoading(false);

        if (authCtx.isSuccess) {
            navigate("/", { replace: true });
        }
    };

    return (
        <section >
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div >
            <label htmlFor='email'>아이디</label>
            <input type='text' id='username' required ref={usernamelInputRef}/>
          </div>
          <div >
            <label htmlFor="password">비밀번호</label>
            <input type='password' id='password' required ref={passwordInputRef}/>
          </div>
          <div >
            <button type='submit'>Login</button>
            {isLoading && <p>Loading</p>}
            <p>Create Account</p>
          </div>
        </form>
      </section>
    );
};
export default AuthForm;