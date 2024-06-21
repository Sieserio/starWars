import { ref, reactive } from 'vue';

// Создаем Map для кэширования данных
const cache = new Map();

export default function useCache(apiFunction) {
    // Создаем реактивную переменную для хранения данных
    const data = ref(null);
    // Создаем реактивный флаг для отслеживания загрузки данных
    const isLoading = ref(false);
    // Создаем реактивный флаг для отслеживания ошибок
    const error = ref(null);

    // Функция для загрузки данных с обработкой кэширования
    async function fetchData(...args) {
        isLoading.value = true;
        error.value = null;

        try {
            // Генерируем уникальный ключ на основе функции и переданных аргументов
            const key = `${apiFunction.toString()}-${JSON.stringify(args)}`;

            // Проверяем, есть ли данные в кэше
            if (cache.has(key)) {
                data.value = cache.get(key); // Используем данные из кэша
            } else {
                // Выполняем запрос API с переданными аргументами
                const response = await apiFunction(...args);
                data.value = response; // Сохраняем данные в переменную
                cache.set(key, response); // Сохраняем данные в кэш
            }
        } catch (e) {
            error.value = e; // Записываем ошибку, если произошла
        } finally {
            isLoading.value = false;
        }
    }

    // Возвращаем необходимые значения и функции для использования в компоненте Vue
    return {
        data,
        isLoading,
        error,
        fetchData
    };
}
