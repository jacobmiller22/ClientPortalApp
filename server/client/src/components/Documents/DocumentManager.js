import React, { useState } from "react";
import { connect } from "react-redux";

import { Toolbar, Tabs, Tab } from "@material-ui/core";

import "../styling/Center.css";

import DocumentList from "./DocumentList";
import LoadMessage from "../Loading/LoadMessage";

const DocumentManager = ({ currentUser }) => {
  const [tab, setTab] = useState("Uploaded by me");

  if (!currentUser) {
    return null;
  }

  /**
   * Displays options in the subheader containing multiple administrator actions.
   * These actions include:
   *  - User Selector
   *  -
   */
  // const renderAdmin = () => {
  //   return <div>Admin</div>;
  // };

  const renderTabs = () => {
    return (
      <>
        <Toolbar>
          <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)}>
            <Tab label='Uploaded by me' value={"Uploaded by me"} />
            <Tab label='Provided for me' value={"Provided for me"} />
          </Tabs>
        </Toolbar>
      </>
    );
  };

  const renderList = () => {
    if (!currentUser) {
      return (
        <div className='centered'>
          <LoadMessage color='primary' message='Please sign in' />
        </div>
      );
    }

    const path =
      tab === "Uploaded by me"
        ? ["User-Documents", "Client-Provided"]
        : ["User-Documents", "Business-Provided"];
    return <DocumentList title={tab} path={path} />;
  };

  return (
    <div>
      {renderTabs()}
      {renderList()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps)(DocumentManager);
