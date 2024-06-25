import {api} from "@/api/base_api.js";

export async function getPlanets(page) {
    return api.get(`planets/?page=${page}`, {searchParams: { page:page }}).json()
}

export async function getPlanetInfo(id) {
    return api.get(`planets/${id}`, {searchParams: {id: id}} ).json()
}