import { useRoute } from 'vue-router'
export const useQueryParams = () => {
    const query = useRoute()
    return query;
}

// зачем, но ладно