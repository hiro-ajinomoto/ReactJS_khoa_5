import { call, delay, takeLatest, put } from "redux-saga/effects";
import {
  ADD_TASK_API,
  CHECK_TASK_API,
  DELETE_TASK_API,
  GET_TASKLIST_API,
  GET_TASK_API,
  REJECT_TASK_API
} from "../constants/ToDoListConst";
import { toDoListService } from "../../services/ToDoListService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";

function* getTaskApiAction(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  try {
    let { data, status } = yield call(toDoListService.getTaskApi);
    yield delay(300);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_API,
        taskList: data
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log("err");
  }
  yield put({
    type: HIDE_LOADING
  });
}

export function* theoDoiActionGetTaskApi() {
  yield takeLatest(GET_TASKLIST_API, getTaskApiAction);
}

function* addTaskApiAction(action) {
  const { taskName } = action;

  try {
    const { data, status } = yield call(() => {
      return toDoListService.addTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiActionAddTaskApi() {
  yield takeLatest(ADD_TASK_API, addTaskApiAction);
}

function* deleteTaskApi(action) {
  const { taskName } = action;
  try {
    const { data, status } = yield call(() => {
      return toDoListService.deleteTaskApi(taskName);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiActionDeleteTask() {
  yield takeLatest(DELETE_TASK_API, deleteTaskApi);
}

function* checkDoneTaskApi(action) {
  const { taskName } = action;

  try {
    const { data, status } = yield call(() => {
      return toDoListService.checkDoneTask(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiDoneTask() {
  yield takeLatest(CHECK_TASK_API, checkDoneTaskApi);
}

export function* rejectTaskApi(action) {
  const { taskName } = action;

  try {
    const { data, status } = yield call(() => {
      return toDoListService.rejectTask(taskName);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiRejectTask() {
  yield takeLatest(REJECT_TASK_API, rejectTaskApi);
}
