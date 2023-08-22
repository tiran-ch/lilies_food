const initialState = {
    food: [],
};

const Food = (state = initialState, action) => {
    switch(action.type){
        case "ADD_FOOD": return {
            ...state,
            food: action.payload
        };
        default: return state
    }
};

export default Food;