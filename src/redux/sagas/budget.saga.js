function* fetchBudget() {
    try{
        const response = yield axios.get('/api/budget')

        yield put({
            type: 'SET_BUDGET',
            payload: response.data
        });
    } catch (error) {
        console.log("Fetch budget error:", error);
    }
}

function* budgetSaga() {
    yield takeLatest('FETCH_BUDGET', fetchBudget);
}

export default budgetSaga;
