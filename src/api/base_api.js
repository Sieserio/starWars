import ky from 'ky';

export const api = ky.extend({
    prefixUrl: 'https://swapi.dev/api/', hooks: {
        beforeRequest: [
            request => {
                console.log('Making request to ' + request.url);
            }
        ]
    }
});

// создаем объект api, наследуясь от базового ky конфига, указываем базовый url, пример использования хуков