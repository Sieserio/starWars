//common
export const HTTPS = 'https://'
export const HTTP = 'http://'

//swapi
export const SWAPI_ROOT = 'swapi.dev/api/'
export const SWAPI_PEOPLE = 'people'
export const SWAPI_PLANETS = 'planets'

export const SWAPI_PARAM_PAGE = '/?page='
export const API_PEOPLE = HTTPS+SWAPI_ROOT+SWAPI_PEOPLE+SWAPI_PARAM_PAGE
export const API_PLANETS = HTTPS+SWAPI_ROOT+SWAPI_PLANETS+SWAPI_PARAM_PAGE

//visual guide

const GUIDE_ROOT_IMG = 'https://starwars-visualguide.com/assets/img/'
const GUIDE_PEOPLE = 'characters'
const GUIDE_PLANETS = 'planets'
export const GUIDE_IMG_EXTENTION = '.jpg'
export const URL_IMG_PERSON = GUIDE_ROOT_IMG+GUIDE_PEOPLE
export const URL_IMG_PLANETS = GUIDE_ROOT_IMG+GUIDE_PLANETS