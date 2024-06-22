// store/people.js
import {getPeople} from '@/api/people.js';
import {getPeopleId, getPeopleImage} from '@/services/getPeopleData.js';
import store from '@/store'; // импорт основного хранилища

async function refactorPeopleList(peopleList) {
    if (peopleList) {
        return peopleList.map((item) => {
            const id = getPeopleId(item.url);
            return {
                id: id,
                name: item.name,
                img: getPeopleImage(id)
            };
        });
    }
}

const state = {
    peopleList: null,
    isLoading: false,
    error: null,
    prevPage: null,
    nextPage: null,
    isUpdating: false
};

const mutations = {
    setPeopleList(state, people) {
        state.peopleList = people;
    },
    setIsLoading(state, isLoading) {
        state.isLoading = isLoading;
    },
    setError(state, error) {
        state.error = error;
    },
    setPrevPage(state, prevPage) {
        state.prevPage = prevPage;
    },
    setNextPage(state, nextPage) {
        state.nextPage = nextPage;
    },
    setIsUpdating(state, isUpdating) {
        state.isUpdating = isUpdating;
    }
};

const actions = {
    async fetchPeople({ commit }, page = 1) {
        const cacheKey = `peopleList_page_${page}`;
        const cachedData = store.getters.getCache(cacheKey);

        // Function to handle the update of the Vuex state with the people data
        async function updateStateFromResponse(response) {
            const people = await refactorPeopleList(response.results);
            commit('setPeopleList', people);
            commit('setPrevPage', response.previous);
            commit('setNextPage', response.next);
            commit('setError', null);
            store.commit('setCache', { key: cacheKey, data: response });
        }

        // Use cached data if available and valid
        if (cachedData) {
            await updateStateFromResponse(cachedData);
        }

        // Fetch fresh data regardless of cache state, to ensure data is up to date
        commit('setIsLoading', !cachedData);  // Only show loading if no cache is available
        try {
            const response = await getPeople(page);
            await updateStateFromResponse(response);
        } catch (error) {
            commit('setError', error.message);
        } finally {
            if (!cachedData) {
                commit('setIsLoading', false); // Stop loading state only if there was no cache
            }
        }
    }
};


const getters = {
    peopleList: (state) => state.peopleList,
    isLoading: (state) => state.isLoading,
    error: (state) => state.error,
    prevPage: (state) => state.prevPage,
    nextPage: (state) => state.nextPage,
    isUpdating: (state) => state.isUpdating
};

export default {
    state,
    mutations,
    actions,
    getters
};

// import {getPeople} from '@/api/people.js';
// import {getPeopleId, getPeopleImage} from '@/services/getPeopleData.js';
//
// async function refactorPeopleList(peopleList) {
//     if (peopleList) {
//         return peopleList.map((item) => {
//             const id = getPeopleId(item.url);
//             return {
//                 id: id,
//                 name: item.name,
//                 img: getPeopleImage(id)
//             };
//         });
//     }
// }
//
//
// const state = {
//         peopleList: null,
//         isLoading: false,
//         error: null,
//         prevPage: null,
//         nextPage: null
//     }
//
// const mutations = {
//         setPeopleList(state, people) {
//             state.peopleList = people;
//         },
//         setIsLoading(state, isisLoading) {
//             state.isLoading = isisLoading;
//         },
//         setError(state, error) {
//             state.error = error;
//         },
//         setPrevPage(state, prevPage) {
//             state.prevPage = prevPage;
//         },
//         setNextPage(state, nextPage) {
//             state.nextPage = nextPage;
//         }
// }
//
// const actions = {
//         async fetchPeople({commit}, page = 1) {
//             commit('setIsLoading', true);
//             try {
//                 const response = await getPeople(page);
//                 const people = await refactorPeopleList(response.results);
//                 commit('setPeopleList', people);
//                 commit('setPrevPage', response.previous);
//                 commit('setNextPage', response.next);
//                 commit('setError', null);
//             } catch (error) {
//                 commit('setError', error.message);
//             } finally {
//                 commit('setIsLoading', false);
//             }
//         }
// }
//
// const getters = {
//         peopleList: (state) => state.peopleList,
//         isLoading: (state) => state.isLoading,
//         error: (state) => state.error,
//         prevPage: (state) => state.prevPage,
//         nextPage: (state) => state.nextPage
// }
//
// export default {
//     state,
//     mutations,
//     actions,
//     getters
// };