import { createStore } from 'vuex'
import getters from './getters'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'
import playList from './modules/playList'

export default createStore({
    modules: {
        settings,
        user,
        permission,
        playList,
    },
    getters,
})
