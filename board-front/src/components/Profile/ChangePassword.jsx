import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth_context';
const ChangePassword = () => {
    let navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const exPasswordInputRef = useRef(null);
    const newPasswordInputRef = useRef(null);
    const newPasswordAgainInputRef = useRef(null);
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredExPassword = exPasswordInputRef.current.value;
        const enteredNewPassword = newPasswordInputRef.current.value;
        const enteredNewPasswordAgain = newPasswordAgainInputRef.current.value;
        if (enteredNewPassword !== enteredNewPasswordAgain) {
            alert("Password Write Correct!");
            return;
        }
        authCtx.changePassword(enteredExPassword, enteredNewPassword);
        if (authCtx.isSuccess) {
            alert("다시 로그인 하세요.");
            authCtx.logout();
            navigate("/", { replace: true });
        }
    };
    return (
        
        <form  onSubmit={submitHandler}>
            <div >
                <label htmlFor='ex-password'>현재 비밀번호</label>
                <input type='password' id='ex-password' minLength={8} ref={exPasswordInputRef} />

                <label htmlFor='new-password'>새 비밀번호</label>
                <input type='password' id='new-password' minLength={8} ref={newPasswordInputRef} />

                <label htmlFor='new-password'>새 비밀번호 확인</label>
                <input type='password' id='new-password' minLength={8} ref={newPasswordAgainInputRef} />
            </div>
            <div >
                <button type='submit'>Change Password</button>
            </div>
            </form>
        );
};
export { ChangePassword };