import axios from "./axios";
import API_ENDPOINTS from "./endpoints";

//
const TodoService = {
    // získání všech objektů
    getAll: async () => {
        const response = await axios.get(API_ENDPOINTS.TODOS);
        return handleResponse(response);
    },

    // filtrování objektů podle stavu
    getFiltered: async (state) => {
        const response = await axios.get(API_ENDPOINTS.FILTER_BY_STATE(state));
        return handleResponse(response);
    },

    // získání objektu podle ID
    getById: async (id) => {
        const response = await axios.get(API_ENDPOINTS.GET_BY_ID(id));
        return handleResponse(response);
    },

    // vytvoření nového objektu
    create: async (todo) => {
        const response = await axios.post(API_ENDPOINTS.CREATE, todo);
        return handleResponse(response);
    },

    // aktualizace objektu dle ID
    updateById: async (id, todo) => {
        const response = await axios.put(API_ENDPOINTS.UPDATE_BY_ID(id), todo);
        return handleResponse(response);
    },

    // odtsranění objektu dle ID
    deleteById: async (id) => {
        const response = await axios.delete(API_ENDPOINTS.DELETE_BY_ID(id));
        return handleResponse(response);
    },
};

// metoda pro zpracování odpovědi z backendu, pokud vrátí isError: true; -> vyhodí chybu
const handleResponse = (response) => {
    if (response.data.isError) {
        throw new Error(
            `${response.data.error.code}: ${response.data.error.message}`
        );
    }
    return response.data;
};

export default TodoService;
