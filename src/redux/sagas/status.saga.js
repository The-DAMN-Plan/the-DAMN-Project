import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateStatus(action) {
    try{
        const { budget_id } = action.payload;
        yield axios.put(`/api/budget/status`, action.payload);
        yield put({ type: 'BUDGET_PLAN', payload: budget_id }); // Pass budgetId as payload
    } catch (error) {
        console.log('Error deleting expense', error);
    }
}


function* statusSaga() {
    yield takeLatest('UPDATE_STATUS', updateStatus);
}

export default statusSaga;