import React from "react";
import { connect } from "react-redux";
import { fetchFiles } from "../../../actions";

import FileList from "../FileList";

const HistoryDashboard = () => {
  return <FileList />;
};

export default HistoryDashboard;
