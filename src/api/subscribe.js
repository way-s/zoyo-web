import request from "@/utils/request"

// 订阅播客
export const subscribePod = (data) => request({
    url: '/as/subscribe',
    method: 'post',
    data: data,
})

// 删除播客
export const delPod = (data) => request({
    url: '/as/del',
    method: 'delete',
    data: data,
})

// 删除播客
export const getPod = () => request({
    url: '/as/getPod',
    method: 'get',
})
