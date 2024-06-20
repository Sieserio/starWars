/**
 * Отправляет запрос fetch
 * @param {String} url - url для запроса
 * @returns {Promise} Promise с резульаттом запроса
 */
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

