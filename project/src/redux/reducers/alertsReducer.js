const initialData = {
    loading: false,
};

export const alertReducer = (state = initialData, action) => {
    switch (action.type) {
        case 'Loading': {
            return {
                ...state,
                loading: action.payload
            }
        }
        default: return state
    }
}