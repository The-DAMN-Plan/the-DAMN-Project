import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getFuturePlans(action) {
    try {
        const result = yield axios.get(`/api/future_plans/${action.payload}`);
        yield put({type: 'SET_FUTURE_PLAN', payload: result.data})
    } catch (error) {
        
    }
}

function* addFuturePlan(action) {
    try {
        console.log(action.payload);
        yield axios.post(`/api/future_plans`, action.payload);
        yield put({type:'GET_FUTURE_PLANS', payload:action.payload.budget_id});
    } catch(error) {
        console.log('Error adding future plan', error);
    }
}

function* updateFuturePlan(action){
    console.log('future plans update ', action.payload);
    try {
        yield axios.put(`/api/future_plans`, action.payload);
        yield put({ type: 'BUDGET_PLAN', payload: action.payload[0].budget_id});
    } catch (error) {
        console.error('Error updating future plan',error);
    }
}

function* deleteFuturePlan(action) {
    try {
        const { futurePlanId, budgetObjId } = action.payload; // Destructure futurePlanId and budgetId from payload
        yield axios.delete(`/api/future_plans/${futurePlanId}`);
        yield put({ type: 'BUDGET_PLAN', payload: budgetObjId }); // Pass budgetId as payload
    } catch(error) {
        console.log('Error deleting plan', error);
    }
}

function* futurePlanSaga() {
    yield takeLatest('GET_FUTURE_PLANS', getFuturePlans)
    yield takeLatest('ADD_FUTURE_PLAN', addFuturePlan);
    yield takeLatest('DELETE_FUTURE_PLAN', deleteFuturePlan);
    yield takeLatest('UPDATE_FUTURE_PLAN', updateFuturePlan);
}

export default futurePlanSaga;