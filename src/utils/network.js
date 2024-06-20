import {API_PEOPLE} from "@/constans/api.js";
import router from "@/router/index.js";
export const getApiResource = async (url) => {

    try {
        const res = await fetch(url);
        if (!res.ok){
            console.log('Could not fetch1.',res.status)
            return false
        }
        return await res.json();

    } catch (error) {
        console.error('Could not fetch2.', error.message);
        return false;
    }
}

// (async () => {
//     const body = await getApiResource(API_PEOPLE)
//     console.log(body)
// })()

