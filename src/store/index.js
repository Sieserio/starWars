import { createStore } from 'vuex';
import test from "@/store/modules/test.js";
import people from "@/store/modules/people.js";
import cache from "@/store/modules/cache.js";
// import people from './modules/people';

export default createStore({
    modules: {
        people,
        test,
        cache
    }
});