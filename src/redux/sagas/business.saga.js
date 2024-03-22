import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchBusiness() {
    try {
        const response = yield axios.get('/api/business')

        yield put({
            type: 'SET_BUSINESS',
            payload: response.data
        });
    } catch (error) {
        console.log("Fetch business error:", error);
    }
}
function* createBusiness(action) {
    try {
        const response = yield axios.post('/api/business', action.payload)

        yield put({ type: 'FETCH_BUSINESS' });

    } catch (error) {
        console.log("Creating business error:", error);
    }
}

function* businessSaga() {
    yield takeLatest('FETCH_BUSINESS', fetchBusiness);
    yield takeLatest('CREATE_BUSINESS', createBusiness);
}

export default businessSaga;