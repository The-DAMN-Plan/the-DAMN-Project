import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* startPlan(action) {
    try {
        const response = yield axios.post(`/api/budget`, action.payload);
        console.log('Start plan');
        yield put({
            type: 'SET_BUDGET',
            payload: response.data
        });

        yield put ({
            type: 'SET_STATUS',
            payload: response.data[0].status
        })
    } catch(error) {
        console.log('Error adding personal expense', error);
    }
}



function* budgetSaga() {
    yield takeLatest('START_PLAN', startPlan);
}

export default budgetSaga;