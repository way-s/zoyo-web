const state = {
    menuList: [],
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.menuList = routes
    }
}

const actions = {
    generateRoutes({ commit },data) {
        commit('SET_ROUTES', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}