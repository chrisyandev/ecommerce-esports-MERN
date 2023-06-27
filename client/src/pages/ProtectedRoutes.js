import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "../components";
import { useUserContext } from "../contexts/user-context";

const ProtectedRoutes = () => {
  const { isLoggedIn, userLoading } = useUserContext();

  return userLoading ? (
    <Loading />
  ) : isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
