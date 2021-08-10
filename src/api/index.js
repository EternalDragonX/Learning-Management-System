import axios from 'axios'
import Vue from '../main.js'


axios.defaults.withCredentials = true;

// Request Interception
axios.interceptors.request.use(function (config) {

    config.headers['Content-Type'] = "application/json";

    return config;
}, function (error) {
    // Request error handle
    return Promise.reject(error);
});

// Response Interception
axios.interceptors.response.use(function (response) {

    return response;

}, (error) => {
   

    if (error.message.includes('Network Error')) {   // determine the return msg contains timeout str

        Vue.$message.error("Connection to server timeout，please contact the adminstrator");

        return Promise.reject(error);
    }

    switch (error.response.status) {

        case 400:
            Vue.$message.error("Request error, return error msg：" + error.response.data);
            break;

        case 401:
            Vue.$message.error("Login session timeout，Please login again");
            break;

        default:

           break;

    }

    return Promise.reject(error);

});

//address
let base = 'http://localhost:54139/';

//methods
export const POST = (url, params) => {
    return axios.post(base + `${url}`, params).then(res => res.data)
}

export const GET = (url, params) => {
    return axios.get(base + `${url}`, params).then(res => res.data)
}

export const PUT = (url, params) => {
    return axios.put(base + `${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
    return axios.delete(base + `${url}`, params).then(res => res.data)
}

export const PATCH = (url, params) => {
    return axios.patch(base + `${url}`, params).then(res => res.data)
} 