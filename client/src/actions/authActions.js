import { GET_ERRORS } from "./types";

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
