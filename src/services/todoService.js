import axios from "./axios";
import API_ENDPOINTS from "./endpoints";

const TodoService = {
    // Získání všech Todo
    getAll: async () => {
        const response = await axios.get(API_ENDPOINTS.TODOS);
        return handleResponse(response);
    },

    // Filtrování Todo podle stavu
    getFiltered: async (state) => {
        const response = await axios.get(API_ENDPOINTS.FILTER_BY_STATE(state));
        return handleResponse(response);
    },

    // Získání Todo podle ID
    getById: async (id) => {
        const response = await axios.get(API_ENDPOINTS.GET_BY_ID(id));
        return handleResponse(response);
    },

    // Vytvoření nového Todo
    create: async (todo) => {
        const response = await axios.post(API_ENDPOINTS.CREATE, todo);
        return handleResponse(response);
    },

    // Aktualizace Todo podle ID
    updateById: async (id, todo) => {
        const response = await axios.put(API_ENDPOINTS.UPDATE_BY_ID(id), todo);
        return handleResponse(response);
    },

    // Smazání Todo podle ID
    deleteById: async (id) => {
        const response = await axios.delete(API_ENDPOINTS.DELETE_BY_ID(id));
        return handleResponse(response);
    },
};

// Funkce pro zpracování odpovědi z backendu
const handleResponse = (response) => {
    if (response.data.isError) {
        throw new Error(
            `${response.data.error.code}: ${response.data.error.message}`
        );
    }
    return response.data;
};

export default TodoService;
