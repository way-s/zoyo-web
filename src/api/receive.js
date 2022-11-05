import request from "@/utils/request"

// 获取收件箱新消息
export const getNews = () => request({
    url: '/box/news',
    method: 'get',
})

// 获取收件箱新消息
export const addPlayList = (data) => request({
    url: '/pl/add',
    method: 'post',
    data: data,
})

// 获取收件箱新消息
export const addCollect = (data) => request({
    url: '/ac/add',
    method: 'post',
    data: data,
})

