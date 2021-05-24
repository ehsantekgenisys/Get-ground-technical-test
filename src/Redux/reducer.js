export const initialState = {
    loading: false,
    data: [],
    totalCount: 0,
    currentPage: 1,
    itemsPerPage: 20,
    filters: [],
    error: null,
};

/* eslint-disable default-case, no-param-reassign */

const appReducer = function (state = initialState, action) {
    switch (action.type) {
        case "LOAD_DATA":
            return {
                ...state,
                loading: action.payload,
                data: [],
                totalCount: 0,
                error: null,
            };
        case "SAVE_DATA":
            return {
                ...state,
                loading: false,
                data: action.payload.books,
                totalCount: action.payload.count,
                currentPage: action.payload.page,
                filters: action.payload.filters,
                error: null,
            }
        case "SHOW_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
};

export default appReducer;

