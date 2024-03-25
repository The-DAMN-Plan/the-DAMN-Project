const finalBudgetReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FINAL_BUDGET':
            return action.payload;
        default:
            return state;
    }
}

export default finalBudgetReducer;