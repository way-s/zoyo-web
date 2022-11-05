import request from "@/utils/request"
import axios from "axios"

// pod 搜索
export const searchByKeyWords = (data) => axios({
    url: 'https://pod.link/search?query=' + data,
    method: 'get'
})

// pod 搜索
export const searchByLink = (data) => request({
    url: '/as/search',
    method: 'post',
    data: data,
})

