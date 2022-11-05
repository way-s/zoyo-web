const state = {
    playInfo:{
        playId: "",
        isPlaying:false,
    }
}

const mutations = {
    SET_PLAYID: (state, data) => {
        state.playInfo = data
    }
}

const actions = {
    setPlayId({ commit },data) {
        commit('SET_PLAYID', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}