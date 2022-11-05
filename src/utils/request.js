import axios from "axios"
import { ElMessage } from 'element-plus' //引入 element-ui 的 Message 模块，用于信息提示
import getStore from '@/store'
import router from "@/router";

// console.log('-------process-----', process.env.NODE_ENV)
// let baseURL = '';
let baseURL = "";
if (process.env.NODE_ENV === 'development') {
    baseURL = process.env.VUE_APP_BASE_URL
}
// console.log('-------baseURL-----', baseURL)

// 创建一个axios实例
let instance = axios.create({
    // 设置基础的url配置项
    // baseURL: 'http://localhost:8888',
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    timeout: 10000,
});

// post 请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 添加请求拦截器
instance.interceptors.request.use(config => {

    const token = getStore.getters.token

    if (token) {
        // console.log("token 不为空 ", token);
        config.headers.Authorization = 'Bearer ' + token
    }
    // 追加时间戳，防止GET请求缓存
    if (config.method.toUpperCase() === "GET") {
        config.params = { ...config.params, _t: new Date().getTime() }
    }

    if (config.method.toUpperCase() === "POST") {
        config.data = JSON.stringify(config.data)
    }

    return config;
}, function (error) {
    // 对请求错误做些什么

    //使用element-ui的message进行信息提示
    ElMessage({
        showClose: true,
        message: error,
        type: "warning"
    });

    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(res => {

    if (res.status !== 200) {
        ElMessage({
            message: res.data.msg,
            type: 'error'
        })
        return Promise.reject(new Error(res.data.msg))
    }
    if (res.data.code === 401) {
        ElMessage({
            message: res.data.msg,
            type: 'error'
        })
        router.push({ path: '/into' })
    }
    return res;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么 
    // 该返回的数据则是axios.catch(err)中接收的数据

    if (error.code.includes("ERR_NETWORK")) {
        console.log("#Network Error");
        //使用element-ui的message进行信息提示
        ElMessage({
            showClose: true,
            message: "网络异常",
            type: "warning"
        });
    }
    return Promise.reject(error);
});

export default instance