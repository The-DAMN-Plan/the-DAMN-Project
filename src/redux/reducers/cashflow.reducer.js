const cashflowReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CASHFLOW':
            return action.payload;
        default:
            return state;
    }
}

export default cashflowReducer;