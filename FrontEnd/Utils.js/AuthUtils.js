import {
  setUserAndToken,
  setToken,
  logout,
} from "../../FrontEnd/src/Redux/UserSlice.js";

const URL = "http://localhost:8000/";

export const checkLoginUser = (dispatch, userData, token) => {
  localStorage.setItem("user", JSON.stringify(userData));
  console.log(token);
  dispatch(setUserAndToken({ user: userData, token }));
};

export const checkLogoutUser = (dispatch) => {
  localStorage.removeItem("user");
  dispatch(logout());
};

export const checkAndRefreshToken = async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log("Local Storage User : ", userData);
  if (userData) {
    try {
      const response = await fetch(`${URL}api/user/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userData._id }), // uncomment this if you need to send the userId
      });

      // Ensure response is ok before proceeding
      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      // Parse the response body once
      const responseJson = await response.json();
      const { token } = responseJson;

      // Use the parsed data
      console.log("Response from RefreshToken EndPoint", responseJson);

      dispatch(setToken(token));
      dispatch(setUserAndToken({ user: userData, token }));
      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      checkLogoutUser(dispatch);
      return false;
    }
  }

  return false;
};
