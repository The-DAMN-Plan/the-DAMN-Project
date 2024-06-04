const expenseReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EXPENSE':
            return action.payload;
        default:
            return state;
    }
}

export default expenseReducer;