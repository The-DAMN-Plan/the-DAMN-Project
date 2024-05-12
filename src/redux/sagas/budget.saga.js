import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* startPlan(action) {
    try {
        const response = yield axios.post(`/api/budget`, action.payload);
        yield put({
            type: 'SET_BUDGET',
            payload: response.data
        });
        const response2 = yield axios.post(`/api/budget/createstatus`, { budget_id: response.data[0].id });
        const response3 = yield axios.post(`/api/budget/createcashflow`, { budget_id: response.data[0].id});
        
    } catch (error) {
        console.log('Error adding personal expense', error);
    }
}

function* fetchBudget(action) {
    try {
        console.log('fetch budget id:', action.payload);
        const response = yield axios.get(`/api/budget/${action.payload}`)
        console.log('response fetch budget:', response.data);
        yield put({
            type: 'SET_FINAL_BUDGET',
            payload: response.data
        })
        yield put({
            type: 'SET_EXPENSE',
            payload: response.data[0].expenses
        })
        yield put({
            type: 'SET_FUTURE_PLAN',
            payload: response.data[0].future_plans
        })
        yield put({
            type: 'SET_INCOME',
            payload: response.data[0].revenue_streams
        })
        yield put({
            type: 'SET_STATUS',
            payload: response.data[0].status
        })
        yield put({
            type: 'SET_CASHFLOW',
            payload: response.data[0].cashflow_months
        })
    } catch (err) {
        console.log('Error getting working budget', err);
    }
}

function* updateBudget(action) {
    try {
        const {budget_id} = action.payload
        yield axios.put(`/api/budget/budget/${budget_id}`, action.payload);

    } catch(error) {
        console.log('Error updating budget', error);
    }
}



function* budgetSaga() {
    yield takeLatest('START_PLAN', startPlan);
    yield takeLatest('BUDGET_PLAN', fetchBudget);
    yield takeLatest('UPDATE_BUDGET', updateBudget);
}

export default budgetSaga;