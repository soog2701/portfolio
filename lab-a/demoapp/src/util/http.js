import axios from 'axios';

// base
const baseURL = axios({
    baseURL: '/user/12345'
});

const DabHttp = () => {
    return baseURL.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers.Authorization = localStorage.getItem('token')
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
};

export default DabHttp;