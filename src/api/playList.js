import request from "@/utils/request"

// 获取收件箱新消息
export const getList = () => request({
    url: '/pl/list',
    method: 'get',
})

// 删除
export const delProgram = (data) => request({
    url: '/pl/del',
    method: 'post',
    data: data
})