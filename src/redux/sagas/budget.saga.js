import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* startPlan(action) {
    try {
        const response = yield axios.post(`/api/budget`, action.payload);

        yield put({
            type: 'SET_BUDGET',
            payload: response.data
        })
    } catch(error) {
        console.log('Error adding personal expense', error);
    }
}



function* budgetSaga() {
    yield takeLatest('START_PLAN', startPlan);
}

export default budgetSaga;