// netty-socketio支持的客户端目前仅仅是v2.X版本 !!!
import io from 'socket.io-client'
import getStore from '@/store'
// import router from "@/router";

export default {
    install: (app) => {
        const token = getStore.getters.token
        if (token.length > 0) {
            const connection = "http://localhost:8889?ws=" + token
            const options = {
                // path: '',// socket.io 库默认服务端path为/socket.io
                autoConnect: true,  // 自动连接
                transports: ['websocket'], // 指定为websocket连接
                // transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
                reconnect: true,
                timeout: 8000,
                reconnectionAttempts: 5 // 重连次数
            }
            const socket = io(connection, options)

            app.config.globalProperties.$socket = socket
            app.provide('socket', socket)

            socket.on("disconnect", (res) => {
                console.log("io #disconnect: ", res);
            });

            socket.on("connect", (res) => {
                // console.log("io 连接成功 ", res);
            });

            // 通告
            socket.on("notice", (data) => {
                console.log("notice 接收到消息:", data);
            });
            // error
            socket.on("error", (res) => {
                // console.log("#error: ", res);
                // if (res == 401) {
                //     localStorage.clear();
                //     router.push({ path: '/into' })
                // }
            });
        }
    }
}


// const socket = io('http://localhost:8889?mac=34', {
//     query: {},
//     transports: ['websocket', 'polling'],
//     timeout: 5000,
// })
// export default socket
