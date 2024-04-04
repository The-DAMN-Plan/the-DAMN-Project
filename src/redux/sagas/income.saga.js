import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addRevenueStream(action) {
    try {
        yield axios.post(`/api/budget/revenuestream`, action.payload);
    } catch(error) {
        console.log('Error adding income', error);
    }
}

function* deleteRevenueStream(action) {
    try {
        const { incomeId, budgetObjId } = action.payload; // Destructure futurePlanId and budgetId from payload
        yield axios.delete(`/api/budget/revenuestream/${incomeId}`);
        yield put({ type: 'BUDGET_PLAN', payload: budgetObjId }); // Pass budgetId as payload
    } catch (error) {
        console.log('Error deleting income', error);
    }
}

function* incomeSaga() {
    yield takeLatest('ADD_BUSINESS_INCOME', addRevenueStream);
    yield takeLatest('DELETE_INCOME', deleteRevenueStream);
}

export default incomeSaga;