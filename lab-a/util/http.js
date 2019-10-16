import axios from 'axios'
import configureStore from '../redux/store';

const instance = axios.create();

if(instance.interceptors) {
    console.log('configureStore', configureStore);
    // Add a request interceptor
    instance.interceptors.request.use(function (config) {
        // Do something before request is sent
        // console.log('interceptors.request', config);
        return config;
    }, function (error) {
        // console.log('interceptors.request', error);
        // Do something with request error
        return Promise.reject(error);
    });
    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
        // console.log('interceptors.response', response);
        // Do something with response data
        return response;
    }, function (error) {
        // console.log('interceptors.response', error);
        // Do something with response error
        return Promise.reject(error);
    });
}

export default instance