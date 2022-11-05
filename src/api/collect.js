import request from "@/utils/request"

// 获取收件箱新消息
export const getList = () => request({
    url: '/ac/list',
    method: 'get',
})

// 获取收件箱新消息
export const delCollect = (data) => request({
    url: '/ac/del',
    method: 'post',
    data: data
})