const API_ENDPOINTS = {
    // Základní endpoint pro Todo
    TODOS: "/Todo",

    // Filtrování
    FILTER_BY_STATE: (state) => `/Todo?state=${state}`,

    // Operace s ID
    GET_BY_ID: (id) => `/Todo/${id}`,
    DELETE_BY_ID: (id) => `/Todo/${id}`,
    UPDATE_BY_ID: (id) => `/Todo/${id}`,

    // Vytvoření nového Todo
    CREATE: "/Todo",
};

export default API_ENDPOINTS;
