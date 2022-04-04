import { call, put, select, takeLatest } from "redux-saga/effects";
import { commentService } from "../../../services/CommentService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
  DELETE_COMMENT_SAGA,
  INSERT_COMMENT_SAGA,
  RESET_UPDATING_COMMENT,
  UPDATE_COMMENT_SAGA
} from "../../constants/Cyberbugs/CommentConstants";
import { GET_TASK_DETAIL_SAGA } from "../../constants/Cyberbugs/TaskConstants";

function* insertCommentSaga(action) {
  try {
    const { status } = yield call(() =>
      commentService.insertCommentService(action.commentDetail)
    );

    if (status === STATUS_CODE.SUCCESS) {
      const { taskDetailModal } = yield select((state) => state.TaskReducer);

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskDetailModal.taskId
      });
    }
  } catch (err) {
    console.log("errors", err.response?.data);
  }
}

export function* theoDoiInsertCommentSaga() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}

function* deleteCommentSaga(action) {
  try {
    const { status } = yield call(() =>
      commentService.deleteCommentService(action.commentId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      const { taskDetailModal } = yield select((state) => state.TaskReducer);

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskDetailModal.taskId
      });
    }
  } catch (err) {
    console.log(err.response?.data);
  }
}

export function* theoDoiDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}

function* updateCommentSaga(action) {
  try {
    const { status } = yield call(() =>
      commentService.updateCommentService(
        action.commentId,
        action.newCommentContent
      )
    );

    if (status === STATUS_CODE.SUCCESS) {
      const { taskDetailModal } = yield select((state) => state.TaskReducer);

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskDetailModal.taskId
      });

      yield put({
        type: RESET_UPDATING_COMMENT
      });
    }
  } catch (err) {
    console.log(err.response?.data);
  }
}

export function* theoDoiUpdateCommentSaga() {
  yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}
