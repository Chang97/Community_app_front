import axios from 'axios';

const fetchAuth = async (fetchData) => {
    const method = fetchData.method;
    const url = fetchData.url;
    const data = fetchData.data;
    const header = fetchData.header;
    try {
        const response = (method === 'get' && (await axios.get(url, header))) ||
            (method === 'post' && (await axios.post(url, data, header))) ||
            (method === 'put' && (await axios.put(url, data, header))) ||
            (method === 'delete' && (await axios.delete(url, header)));

            
        if (response && response.data.error) {
            alert("아이디 또는 비밀번호가 잘못되었습니다.");
            return null;
        }
        if (!response) {
            alert("false!");
            return null;
        }
        return response;
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            const serverError = err;
            if (serverError && serverError.response) {
                alert("failed!");
                return null;
            }
        }
        alert("failed!");
        return null;
    }
};
const GET = (url, header) => {
    const response = fetchAuth({ method: 'get', url, header });
    return response;
};
const POST = (url, data, header) => {
    const response = fetchAuth({ method: 'post', url, data, header });
    return response;
};
const PUT = async (url, data, header) => {
    const response = fetchAuth({ method: 'put', url, data, header });
    return response;
};
const DELETE = async (url, header) => {
    const response = fetchAuth({ method: 'delete', url, header });
    return response;
};
export { GET, POST, PUT, DELETE };
