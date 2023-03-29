import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function UserJoinComponenet() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const changeUsernameHandler = (e) => {
        setUsername(e.target.value);
    }

    const changeEmailHandler = (e) => {
        setEmail(e.target.value);
    }

    const changePasswordHandler = (e) => {
        setPassword(e.target.value);
    }

    const createUser = (e) => {
        e.preventDefault();
        
        let user = {
            username : username,
            email : email,
            password : password
        };

        console.log("user => ", JSON.stringify(user));
        UserService.createUser(user).then(res => {
            navigate('/login');
        });
    }

    return(
        <div className="Auth-form-container">
        <form className="Auth-form">
            <div className="Auth-form-content">
            <h3 className="Auth-form-title">회원가입</h3>
            <div className="form-group mt-3">
                <label>아이디</label>
                <input
                type="email"
                className="form-control mt-1"
                placeholder="아이디"
                name='username'
                onChange={changeUsernameHandler}
                />
            </div>
            <div className="form-group mt-3">
                <label>이메일</label>
                <input
                type="email"
                className="form-control mt-1"
                placeholder="이메일"
                name='email'
                onChange={changeEmailHandler}
                />
            </div>
            <div className="form-group mt-3">
                <label>비밀번호</label>
                <input
                type="password"
                className="form-control mt-1"
                placeholder="비밀번호"
                name='password'
                onChange={changePasswordHandler}
                />
            </div>
            <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary" onClick={createUser}>
                회원가입
                </button>
            </div>
            </div>
        </form>
        </div>
    );
}

export default  UserJoinComponenet;