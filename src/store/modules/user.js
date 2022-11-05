const state = {
    token: localStorage.getItem("token") || "",
    userinfo: JSON.parse(localStorage.getItem("userinfo")) || {},
    news: 0,
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
        localStorage.setItem("token", state.token)
    },
    SET_USERINFO: (state, data) => {
        localStorage.setItem("userinfo", JSON.stringify(data))
    },
    SET_NEWS:(state, data) => {
        // sessionStorage.setItem("news", data)
        state.news = data
    },
}

const actions = {
    setToken({ commit }, token) {
        commit('SET_TOKEN', token)
    },
    setUserinfo({ commit }, data) {
        commit('SET_USERINFO', data)
    },
    setNews({ commit }, data) {
        commit('SET_NEWS', data)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}