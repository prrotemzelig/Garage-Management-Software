import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://garage-management-softwa.firebaseio.com/'
});

export default instance;