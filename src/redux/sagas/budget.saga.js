import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* startPlan(action) {
    try {
        yield axios.post(`/api/budget`, action.payload);
    } catch(error) {
        console.log('Error adding personal expense', error);
    }
}