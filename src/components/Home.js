import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import "./Home.scss";
import "./face-detect/Script.js";
import Script from "./face-detect/Script.js";

class Home extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  render() {
    const { isLoggingOut, logoutError } = this.props;

    return (
      <div id="mmain">
        <h1 className="main">Face Detectation</h1>
        <Script />
        {/* <button onClick={this.handleLogout}>Logout</button>
        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>} */}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default connect(mapStateToProps)(Home);
