import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete auth headers
    delete axios.defaults.headers.common["Athorization"];
  }
};

export default setAuthToken;