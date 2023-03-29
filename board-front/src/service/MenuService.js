import axios from 'axios';

const MENU_API_BASE_URL = "http://localhost:8000/nav";

class MenuService {
    getAllMenus() {
        return axios.get(MENU_API_BASE_URL + "/menu");
    }
}

export default new MenuService();