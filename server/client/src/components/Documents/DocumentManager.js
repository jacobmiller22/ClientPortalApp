import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Toolbar, Tabs, Tab } from "@material-ui/core";

import "../styling/Center.css";

import DocumentList from "./DocumentList";
import LoadMessage from "../Loading/LoadMessage";

const DocumentManager = (props) => {
  const [tab, setTab] = useState(0);
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
        <Toolbar style={{ backgroundColor: "#f6f7f7" }}>
          <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)}>
            <Tab label='Uploaded by me' value={0} />
            <Tab label='Provided for me' value={1} />
          </Tabs>
        </Toolbar>
      </>
    );
  };

  const renderList = () => {
    if (!props.currentUser) {
      return (
        <div className='centered'>
          <LoadMessage color='primary' message='Signing in...' />
        </div>
      );
    }

    if (tab === 0) {
      return (
        <DocumentList
          title='Uploaded by me'
          path={["User-Documents", "Client-Provided"]}
        />
      );
    }

    return (
      <DocumentList
        title='Provided for me'
        path={["User-Documents", "Business-Provided"]}
      />
    );
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
