import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addYear(action) {
    try {
        yield axios.post(`api/year`, action.payload);
        yield put({type: 'GET_YEARS', payload: action.payload });
    } catch(error) {
        console.error(error);
    }
}

function* getYears(action) {
    try {
        let result = yield axios.get(`api/year/${action.payload.budgetId}`);
        yield put({type: 'SET_YEAR', payload: result.data});
    } catch(error) {
        console.error(error);
    }
}

function* yearSaga() {
    yield takeLatest('ADD_YEAR', addYear);
    yield takeLatest('GET_YEARS', getYears);
    
}

export default yearSaga;