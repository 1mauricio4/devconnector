// models
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import reduxStore from "./store";
// to check for token
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
// components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "./App.css";

// check for token
if (localStorage.jwtToken) {
  // Set Auth Token into axios header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info & exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  reduxStore.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (currentTime >= decoded.exp) {
    // logout user
    reduxStore.dispatch(logoutUser());
    // TODO: Clear current Profile

    // redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
