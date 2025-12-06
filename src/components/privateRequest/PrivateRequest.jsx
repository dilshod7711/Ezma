import authStore from "../../store/authStore";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRequest = () => {
  const { isAuth } = authStore();

  if (!isAuth) return <Navigate to="login" />;
  return <Outlet />;
};

export default PrivateRequest;
