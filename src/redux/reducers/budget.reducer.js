const budgetReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_BUDGET':
            return action.payload;
        default:
            return state;
    }
}

export default budgetReducer;