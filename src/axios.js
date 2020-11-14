import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://15.207.98.40:5000'
});

export default instance
