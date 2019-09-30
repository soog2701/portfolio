import axios from 'axios'

var instance = axios.create({
    baseURL: 'localhost:8080',
    // timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar'}
  });
// instance.defaults.headers.common['Authorization'] = localStorage.getItem('token')
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});