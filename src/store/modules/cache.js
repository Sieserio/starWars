const state = {
    cache: {}
};

const mutations = {
    setCache(state, { key, data }) {
        state.cache[key] = data;
    }
};

const getters = {
    getCache: (state) => (key) => {
        return state.cache[key];
    }
};

export default {
    state,
    mutations,
    getters
};
