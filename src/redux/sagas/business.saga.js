import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchBusiness() {
    try{
        const response = yield axios.get('/api/business')

        yield put({
            type: 'SET_BUSINESS',
            payload: response.data
        });
    } catch (error) {
        console.log("Fetch business error:", error);
    }
}

function* businessSaga() {
    yield takeLatest('FETCH_BUSINESS', fetchBusiness);
}

export default businessSaga;