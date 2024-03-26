import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateStatus(action) {

}


function* statusSaga() {
    yield takeLatest('UPDATE_STATUS', updateStatus);
}

export default statusSaga;