import axios from 'axios';
const BOARD_LIST_API_BASE_URL = "http://localhost:8000/api";
const BOARD_API_BASE_URL = "http://localhost:8000/api/board";

class BoardService {
    getBoard(menuCd, pageNo) {
        return axios.get(BOARD_LIST_API_BASE_URL + '/' + menuCd + "?page=" + pageNo);
    }

    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board);
    }

    getOneBoard(id) {
        return axios.get(BOARD_API_BASE_URL + "/" + id);
    }

    updateBoard(id, board) {
        return axios.put(BOARD_API_BASE_URL + "/" + id, board);
    }

    deleteBoard(id) {
        return axios.delete(BOARD_API_BASE_URL + "/" + id);
    }
}

export default new BoardService();