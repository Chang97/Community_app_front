import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserService from "../service/UserService";

function UserLoginComponenet() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const changeUsernameHandler = (e) => {
        setUsername(e.target.value);
    }

    const changePasswordHandler = (e) => {
        setPassword(e.target.value);
    }

    const loginUser = (e) => {
        e.preventDefault();
        
        let user = {
            username : username,
            password : password
        };

        UserService.loginUser(user).then(res => {
          navigate('/');
        });
    }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">로그인</h3>
          <div className="form-group mt-3">
            <label>아이디</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter id"
              onChange={changeUsernameHandler}
            />
          </div>
          <div className="form-group mt-3">
            <label>비밀번호</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={changePasswordHandler}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary"
            onClick={loginUser}>
              로그인
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            <a href="#">비밀번호를 잊으셨나요?</a>
          </p>
          <p className="user-join text-right mt-2">
            <Link to = '/signup'>회원가입</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default  UserLoginComponenet;