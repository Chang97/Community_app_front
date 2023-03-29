import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth_context';

const CreateAccountForm = () => {
    let navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const usernameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredUsername = usernameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        
        authCtx.signup(enteredUsername, enteredPassword, enteredEmail);
        if (authCtx.isSuccess) {
            return navigate("/", { replace: true });
        }
    };
    return (
        <form onSubmit={submitHandler} className="Auth-form">
        <div className="Auth-form-content">
            <label htmlFor='username'>아이디</label>
            <input type='text' id='username' className="form-control mt-1" minLength={3} required ref={usernameInputRef}/>
        </div>
        <div className="Auth-form-content">
            <label htmlFor='password'>비밀번호</label>
            <input type='password' id='password' className="form-control mt-1" minLength={3} required ref={passwordInputRef}/>
        </div>
        <div className="Auth-form-content">
            <label htmlFor='email'>이메일</label>
            <input type='email' id='email' className="form-control mt-1" minLength={3} required ref={emailInputRef}/>
        </div>
        <div className="d-grid gap-2 mt-3 ">
            <button type='submit' className="btn btn-primary">회원가입</button>
        </div>
        </form>
    );
};
export default CreateAccountForm;