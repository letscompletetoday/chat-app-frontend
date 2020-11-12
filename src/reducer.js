export const initialState = {
    user: null,
};

// Keep all actionTypes here
export const actionTypes = {
    SET_USER: "SET_USER",
};

const reducer = (state, action) => {

    // Listening to action type
    switch (action.type) {
        case actionTypes.SET_USER:
            //Here is where we are modifying the state value
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
};

export default reducer;