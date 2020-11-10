import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://ec2-13-127-158-77.ap-south-1.compute.amazonaws.com:8300'
})

export default instance