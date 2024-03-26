import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addFuturePlan(action) {
    try {
        console.log('Adding Future Plan', action.payload);
        yield axios.post(`/api/future_plans`, action.payload);
    } catch(error) {
        console.log('Error adding future plan', error);
    }
}

function* deleteFuturePlan(action) {
    try {
        console.log('Deleting future plan', action.payload);
        const { futurePlanId, budgetObjId } = action.payload; // Destructure futurePlanId and budgetId from payload
        yield axios.delete(`/api/future_plans/${futurePlanId}`);
        yield put({ type: 'BUDGET_PLAN', payload: budgetObjId }); // Pass budgetId as payload
    } catch(error) {
        console.log('Error deleting plan', error);
    }
}

function* futurePlanSaga() {
    yield takeLatest('ADD_FUTURE_PLAN', addFuturePlan);
    yield takeLatest('DELETE_FUTURE_PLAN', deleteFuturePlan);
}

export default futurePlanSaga;