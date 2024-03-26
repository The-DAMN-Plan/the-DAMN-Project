const futurePlanReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FUTURE_PLAN':
            return action.payload;
        default:
            return state;
    }
}

export default futurePlanReducer;