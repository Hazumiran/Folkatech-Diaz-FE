import axios from 'axios';

const API_BASE_URL = 'https://techtest.folkatech.com/api';

const login = (email, password) => {
    return axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password,
    });
};

const register = (name, email, password, phone) => {
    return axios.post(`${API_BASE_URL}/register`, {
        name: name,
        email: email,
        password: password,
        phone: phone
    });
};

const getData = (minPrice = 0, maxPrice = 0, keyword = '', page = 1, limit = 10) => {
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    // console.log(minPrice, maxPrice, keyword, page, limit)
    let url = `${API_BASE_URL}/product?keyword=${keyword}&page=${page}&limit=${limit}&order=product_name,ASC`;

    if (minPrice > 0 || maxPrice > 0) {
        url += `&price=${minPrice},${maxPrice}`;
    }
    return axios.get(url, { headers });
};


export {
    login,
    register,
    getData,
};