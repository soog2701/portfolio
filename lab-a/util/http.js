import axios from 'axios'

import { actionTypes, exceptionRequest } from '../redux/module/exception'

const instance = axios.create();
let set = {};
if(instance.interceptors) {
    set = {
        setupInterceptors: (store) => {            
            instance.interceptors.request.use(function (config) {                
                return config;
            }, function (error) { 
                return Promise.reject(error);
            });            
            instance.interceptors.response.use(function (response) {                 
                return response;
            }, function (error) {
                console.log('error',error)                
                // alert(error)
                store.dispatch(exceptionRequest());                 
                return Promise.reject(error);
            });
        }
    }
}
export { set }
export default instance