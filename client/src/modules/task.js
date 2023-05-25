import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as tasksAPI from '../lib/api/tasks';
import { takeLatest } from 'redux-saga/effects';

const [READ_TASK, READ_TASK_SUCCESS, READ_TASK_FAILURE] =
  createRequestActionTypes('task/READ_TASK');

const UNLOAD_TASK = 'task/UNLOAD_TASK'; // Task 페이지에서 벗어날 때 데이터 비우기

export const readTask = createAction(READ_TASK, (id) => id);
export const unloadTask = createAction(UNLOAD_TASK);

const readTaskSaga = createRequestSaga(READ_TASK, tasksAPI.readTask);
export function* taskSaga() {
  yield takeLatest(READ_TASK, readTaskSaga);
}

const initialState = {
  user: null,
  task: null,
  error: null,
};

const task = handleActions(
  {
    [READ_TASK_SUCCESS]: (state, { payload: task }) => ({
      ...state,
      task,
    }),
    [READ_TASK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_TASK]: () => initialState,
  },
  initialState,
);

export default task;
