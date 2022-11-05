import { ElMessage } from 'element-plus'

export const info = (msg) => {
    ElMessage({
        message: msg,
        grouping: true,
        showClose: true,
        duration: 1000,
    })
}

export const success = (msg) => {
    ElMessage({
        message: msg !== null ? msg : "成功",
        grouping: true,
        type: 'success',
        showClose: true,
        duration: 1000,
    })
}

export const warn = (msg) => {
    ElMessage({
        showClose: true,
        message: msg != null ? msg : "warning",
        type: 'warning',
    })
}

export const error = (msg) => {
    ElMessage({
        showClose: true,
        message: msg != null ? msg : "error",
        type: 'error',
    })
}

