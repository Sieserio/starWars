import {api} from "@/api/base_api.js";

export async function getPeople(page = 1) {
    return api.get(`people/?page=${page}`, {searchParams: {page: page}}).json();
}

export  async  function  getPerson(id) {
    return api.get(`people/${id}`, {searchParams: {id: id}}).json();
}

// поскольку в swapi нет большого количества url параметров, можно их захарткодить.
// return api.get(`people/?page=${page}`).json();
// хорошей практикой будет вынести их в обьект