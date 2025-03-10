import {API_PEOPLE} from "@/constans/api.js";

export const getApiResource = async (url) => {

    try {
        const res = await fetch(url);
        if (!res.ok){
            console.log('Could not fetch.',res.status)
            return false
        }
        return await res.json();

    } catch (error) {
        console.error('Could not fetch.', error.message);
        return false;
    }
}

(async () => {
    const body = await getApiResource(API_PEOPLE)
    console.log(body)
})()

