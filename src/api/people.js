import {api} from "@/api/base_api.js";

export async function getPeople(page = 1, tags = []) {
    const params = new URLSearchParams();
    params.append('page', page);

    console.log(tags);

    if (tags && tags.length > 0) {
        for (const tag of tags) {
            params.append('themeIds', tag);
        }
    }
    return api.get(`people`, {searchParams: params}).json();
}

export  async  function  getPerson(id) {
    return api.get(`people/${id}`, {searchParams: {id: id}}).json();
}

export async function getPeopleTegs(page, tags) {
    const params = new URLSearchParams();
    params.append('page', page);

    if (tags && tags.length > 0) {
        for (const tag of tags) {
            params.append('themeIds', tag);
        }
    }

    const response = await api.get('people/', {
        searchParams: params
    }).json();

    return response;
}


// поскольку в swapi нет большого количества url параметров, можно их захарткодить.
// return api.get(`people/?page=${page}`).json();
// хорошей практикой будет вынести их в обьект