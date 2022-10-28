import axios from 'axios';

const api = axios.create({
    baseURL: "https://expressodennys.herokuapp.com"
})

export default api;