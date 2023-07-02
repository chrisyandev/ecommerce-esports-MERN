import React, { useEffect } from "react";
import { Outlet, Navigate, useResolvedPath } from "react-router-dom";
import { Loading } from "../components";
import { useUserContext } from "../contexts/user-context";

const ProtectedRoutes = () => {
  const { isLoggedIn, userLoading, updatePostLoginPath } = useUserContext();
  const resolvedPath = useResolvedPath();

  useEffect(() => {
    updatePostLoginPath(resolvedPath.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return userLoading ? (
    <Loading />
  ) : isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
