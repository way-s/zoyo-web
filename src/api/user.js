import request from "@/utils/request"

// 注册
export const register = (data) => request({
    url: '/user/reg',
    method: 'post',
    data: data
})

// 登录
export const login = (data) => request({
    url: '/user/login',
    method: 'post',
    data: data
})

// 退出
export const logout = () => request({
    url: '/user/logout',
    method: 'post'
})

// 获取用户基本信息
export const info = () => request({
    url: '/user/info',
    method: 'get'
})