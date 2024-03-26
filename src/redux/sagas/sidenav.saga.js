import { put, takeLatest } from "redux-saga/effects";

function* toggleSideNav() {
    yield put({type: 'SET_SIDE_NAV'});
}

function* sideNavSaga() {
    yield takeLatest('TOGGLE_SIDE_NAV', toggleSideNav);
    
}

export default sideNavSaga;