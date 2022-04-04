import React from "react";
import { Route } from "react-router-dom";
import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberBugs from "../../components/Cyberbugs/ModalCyberBugs.js/ModalCyberBugs";
import SidebarCyberbugs from "../../components/Cyberbugs/SidebarCyberbugs";

import "../../index.css";

export const CyberbugsTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <div className="jira">
              <SidebarCyberbugs />
              <MenuCyberbugs />
              <Component {...propsRoute} />
              <ModalCyberBugs {...propsRoute} />
            </div>
          </>
        );
      }}
    />
  );
};
