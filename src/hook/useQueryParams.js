import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default function useQueryParams() {
    const route = useRoute();
    const router = useRouter();

    const addQueryParam = (paramName, paramValue) => {
        const newQuery = { ...route.query };

        if (newQuery[paramName]) {
            if (Array.isArray(newQuery[paramName])) {
                newQuery[paramName].push(paramValue);
            } else {
                newQuery[paramName] = [newQuery[paramName], paramValue];
            }
        } else {
            newQuery[paramName] = paramValue;
        }

        router.push({ query: newQuery });


    }

    const removeQueryParam = (paramName, paramValue) => {
        const newQuery = { ...route.query };

        if (newQuery[paramName]) {
            if (Array.isArray(newQuery[paramName])) {
                newQuery[paramName] = newQuery[paramName].filter(value => value !== paramValue);
                if (newQuery[paramName].length === 0) {
                    delete newQuery[paramName];
                }
            } else if (newQuery[paramName] === paramValue) {
                delete newQuery[paramName];
            }
        }

        router.push({ query: newQuery });
    };

    return {
        addQueryParam,
        removeQueryParam,
    };
}
