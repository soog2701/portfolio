import axios from "axios";
import url from "./url";

/* import {actionTypes, exceptionRequest} from "../redux/exception/exception"; */


const instance = axios.create({
    baseURL: url.api // 'http://192.168.0.150:8080/' / lbs-web.dabeeomaps.com
    /* headers: {
        'Content-Type': 'application/json' // 'application/x-www-form-urlencoded' // 'multipart/form-data'
    } */
});

let set = {};
if (instance.interceptors) {
    set = {
        setupInterceptors: () => { // store
            instance.interceptors.request.use(function (config) {
                return config;
            }, function (error) {
                return Promise.reject(error);
            });
            instance.interceptors.response.use(function (response) {
                return response;
            }, function (error) {
                console.log("error", error);

                /* alert(error)
                store.dispatch(exceptionRequest()); */
                return Promise.reject(error);
            });
        }
    };
}
export {set};
export default instance;
