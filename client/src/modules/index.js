import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, {authSaga} from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import task, {taskSaga} from './task';
import tasks, {tasksSaga} from './tasks';
import create, {createSaga} from './create';

const rootReducer = combineReducers({
    auth,
    loading,
    user,
    task,
    tasks,
    create,
});

export function* rootSaga() {
    yield all([authSaga(), userSaga(), taskSaga(), tasksSaga(), createSaga()]);
}

export default rootReducer;