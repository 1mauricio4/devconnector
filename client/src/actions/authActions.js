import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import { decode } from "punycode";

// Register User
export const registerUser = (userData, history) => async dispatch => {
  let res = await fetch("/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });
  let json = await res.json();

  if (res.ok) {
    history.push("/login");
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: json
    });
  }
};

// login - Get user token
export const loginUser = userData => async dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to auth Header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );

  // let res = fetch("/api/users/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(userData)
  // });

  // let json = await res.json();

  // if (!res.ok) {
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: json
  //   });
  // }
};

// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
