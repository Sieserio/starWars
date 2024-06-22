const state = {
    count: 0
};

const mutations = {
    increment(state) {
        state.count++;
    }
};

const actions = {
    increment({ commit }) {
        commit('increment');
    }
};

const getters = {
    doubleCount: (state) => state.count * 2
};

export default {
    state,
    mutations,
    actions,
    getters
};