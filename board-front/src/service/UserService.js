import axios from 'axios';
// 1. axios 전역 설정
axios.defaults.withCredentials = true; // withCredentials 전역 설정

const AUTH_API_BASE_URL = "http://localhost:8000/auth";

class BoardService {

    createUser(user) {
        return axios.post(AUTH_API_BASE_URL + "/singup", user);
    }

    loginUser(user) {
        return axios.get(AUTH_API_BASE_URL + "/login", user);
    }
}

export default new BoardService();