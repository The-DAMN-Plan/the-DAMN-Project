import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addRevenueStream(action) {
    try {
        yield axios.post(`/api/budget/revenuestream`, action.payload);
    } catch(error) {
        console.log('Error adding income', error);
    }
}

// action payload contains the budget id and other revenue data to update
function* updateRevenue(action) {
    try {
        yield axios.put(`/api/budget/revenuestream`, action.payload);
        yield put({ type: 'BUDGET_PLAN', payload: action.payload[0].budget_id });
    } catch (error) {
        console.log('Error updating revenue', error);
    }
    
}

function* deleteRevenueStream(action) {
    try {
        const { incomeId, budgetObjId } = action.payload; // Destructure futurePlanId and budgetId from payload
        yield axios.delete(`/api/budget/revenuestream/${incomeId}`);
        yield put({ type: 'BUDGET_PLAN', payload: budgetObjId }); // Pass budgetId as payload
    } catch (error) {
        console.log('Error deleting income', error);
    }
}

function* incomeSaga() {
    yield takeLatest('ADD_BUSINESS_INCOME', addRevenueStream);
    yield takeLatest('DELETE_INCOME', deleteRevenueStream);
    yield takeLatest('UPDATE_REVENUE', updateRevenue);
}

export default incomeSaga;