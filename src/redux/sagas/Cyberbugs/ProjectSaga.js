import { call, delay, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { history } from "../../../util/history";
import { projectService } from "../../../services/ProjectService";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import {
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA
} from "../../constants/Cyberbugs/ProjectCyberBugsConstants";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../constants/Cyberbugs/UserConstatnts";
function* createProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    //Gọi api lấy dữ liệu về
    const { status } = yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );
    //Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      history.push("/projectmanagement");
    }
  } catch (err) {
    console.log(err.response.data);
    if (err) {
      alert(err.response.data.content + `- Please change new project name :]`);
    }
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function* theoDoiCreateProjectSaga() {
  yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga);
}

function* getListProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getListProject()
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_LIST_PROJECT",
        projectList: data.content
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiGetListProjectSaga() {
  yield takeLatest("GET_LIST_PROJECT_SAGA", getListProjectSaga);
}

function* updateProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const { status } = yield call(() =>
      cyberbugsService.updateProject(action.prjectUpdate)
    );
    if (status === STATUS_CODE.SUCCESS) {
    }
    yield call(getListProjectSaga);
    yield put({
      type: "CLOSE_DRAWER"
    });
  } catch (err) {
    console.log(err);
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function* theoDoiUpdateProjectSaga() {
  yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga);
}

function* deleteProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const { status } = yield call(() =>
      projectService.deleteProject(action.idProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "Delete project successfully !");
    } else {
      notifiFunction("error", "Delete project fail !");
    }
    yield call(getListProjectSaga);
    yield put({
      type: "CLOSE_DRAWER"
    });
  } catch (err) {
    notifiFunction("error", "Delete project fail !");
    console.log(err);
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function* theoDoiDeleteProject() {
  yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga);
}

function* getProjectDetailSaga(action) {
  yield delay(500);

  try {
    const { data } = yield call(() =>
      projectService.getProjectDetail(action.projectId)
    );

    yield put({
      type: "PUT_PROJECT_DETAIL",
      projectDetail: data.content
    });
  } catch (err) {
    console.log("404 not found !");
    history.push("/projectmanagement");
  }
}

export function* theoDoiGetProjectDetail() {
  yield takeLatest("GET_PROJECT_DETAIL", getProjectDetailSaga);
}

function* getProjectAllSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const { data } = yield call(() => projectService.getAllProject());

    yield put({
      type: GET_ALL_PROJECT,
      arrProject: data.content
    });

    yield put({
      type: GET_USER_BY_PROJECT_ID_SAGA,
      idProject: data.content[0].id
    });
  } catch (err) {
    console.log("404 not found !");
    history.push("/projectmanagement");
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function* theoDoiGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getProjectAllSaga);
}
