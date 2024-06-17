import axios from "axios";


const getInstance = () => {
    return axios.create({
        baseURL: 'http://www.omdbapi.com',
        headers: {}  
    })
}

const axiosInstance = getInstance();

export default axiosInstance;
