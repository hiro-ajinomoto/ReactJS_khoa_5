import React, { useEffect } from "react";
import { Switch, useHistory } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import About from "./pages/About/About";
import BaiTapToDoListSaga from "./pages/BaiTapToDoListSaga/BaiTapToDoListSaga";
import Contact from "./pages/Contact/Contact";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import Todolist from "./pages/Todolist/Todolist";
import ToDoListRedux from "./pages/Todolist/ToDoListRedux";
import TodolistRFC from "./pages/Todolist/TodolistRFC";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import { useDispatch } from "react-redux";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import indexCyberBugs from "./pages/CyberBugs/ProjectDetail/indexCyberBugs";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import DrawerCyberBugs from "./HOC/CyberbugsHOC/DrawerCyberBugs";
import Demo from "./pages/Demo/Demo";
import DragAndDropDnD from "./pages/DragAndDropDnD/DragAndDropDnD";
import Register from "./pages/Register/Register";
import Users from "./pages/CyberBugs/Users/Users";
import EditUser from "./pages/CyberBugs/Users/EditUser/EditUser";
import AddUsers from "./pages/CyberBugs/Users/AddUsers/AddUsers";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "ADD_HISTORY", history: history });
  }, []);

  return (
    <div>
      <LoadingComponent />

      <DrawerCyberBugs />

      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/about" Component={About} />
        <UserLoginTemplate exact path="/" Component={LoginCyberBugs} />
        <UserLoginTemplate exact path="/register" Component={Register} />

        <HomeTemplate exact path="/detail/:id" Component={Detail} />
        <HomeTemplate exact path="/profile" Component={Profile} />
        <HomeTemplate exact path="/todolistrfc" Component={TodolistRFC} />
        <HomeTemplate exact path="/todolistrcc" Component={Todolist} />
        <HomeTemplate exact path="/todolistredux" Component={ToDoListRedux} />
        <HomeTemplate
          exact
          path="/todolistsaga"
          Component={BaiTapToDoListSaga}
        />
        <HomeTemplate exact path="/demohocmodal" Component={DemoHOCModal} />
        <HomeTemplate exact path="/demo" Component={Demo} />
        <HomeTemplate
          exact
          path="/demodragdropdnd"
          Component={DragAndDropDnD}
        />
        <CyberbugsTemplate exact path="/cyberbugs" Component={indexCyberBugs} />
        <CyberbugsTemplate
          exact
          path="/createproject"
          Component={CreateProject}
        />
        <CyberbugsTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />
        <CyberbugsTemplate
          exact
          path="/projectdetail/:projectId"
          Component={indexCyberBugs}
        />

        <CyberbugsTemplate exact path="/users" Component={Users} />
        <CyberbugsTemplate
          exact
          path="/users/edituser/:id"
          Component={EditUser}
        />
        <CyberbugsTemplate exact path="/users/addusers" Component={AddUsers} />

        <HomeTemplate path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
