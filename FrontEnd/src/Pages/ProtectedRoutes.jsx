import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAndRefreshToken } from "../../Utils.js/AuthUtils.js";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const localStorageUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (localStorageUser && !token) {
      checkAndRefreshToken(dispatch);
    }
  }, [dispatch, token]);

  if (!isAuthenticated && !localStorageUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
