import registerElement from './register-element'
import 'element-plus/es/components/message/style/css'
import * as elMsg from "@/utils/ElMsgUtil";
import io from "./socketIo"


export function globalRegister(app) {
    app.use(registerElement)
    app.use(io)
    app.config.globalProperties.$elMsg = elMsg
}
