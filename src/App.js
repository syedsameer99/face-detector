import React from "react";
// import './App.css';

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";
// import Particles from "react-particles-js";


// const params = {
//   particles: {
//     number: {
//       value: 100,
//       density: {
//         eanble: true,
//         value_area: 800
//       }
//     }
//   }
// };

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      {/* <Particles params={params} className="particles" /> */}
      <ProtectedRoute
        exact
        path="/"
        component={Home}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/login" component={Login} />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);
