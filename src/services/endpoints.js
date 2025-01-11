const API_ENDPOINTS = {
    // základní endpoint pro tabulku v DB
    TODOS: "/Todo",

    // filtrování
    FILTER_BY_STATE: (state) => `/Todo?state=${state}`,

    // operace s ID
    GET_BY_ID: (id) => `/Todo/${id}`,
    DELETE_BY_ID: (id) => `/Todo/${id}`,
    UPDATE_BY_ID: (id) => `/Todo/${id}`,

    // vytvoření nového objektu
    CREATE: "/Todo",
};

export default API_ENDPOINTS;
