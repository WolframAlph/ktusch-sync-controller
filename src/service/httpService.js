import axios from 'axios'
import router from "../router";
import store from '../store'


export const syncClient = axios.create({
    baseURL: 'http://ktusch-sync.cloudeepi.com:5000',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*"
    },
})

syncClient.interceptors.request.use(
    config => {
        const data = localStorage.getItem("user");
        if (data) {
            config.headers.common["Authorization"] = JSON.parse(data).token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

syncClient.interceptors.response.use(
    response => {
        if (response.status === 200 || response.status === 201) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem('user')
                    store.commit('SET_WARNING', 'Your session has expired')
                    router.push('/')
                    break;

            }
            return Promise.reject(error);
        }
    }
)

export default {
    authenticate (user, password) {
        return syncClient.get(`/authorization?user=${user}&password=${password}`)
    },

    getSyncInfo() {
        console.log(syncClient.defaults.headers)
        return syncClient.get(`/status`)
    }
}