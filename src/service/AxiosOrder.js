import axios from "axios";

const instance = axios.create({
    baseURL: 'https://student-api.acpt.lk'
});

export default instance;

// http://localhost:3000