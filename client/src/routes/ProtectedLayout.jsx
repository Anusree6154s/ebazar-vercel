import { useSelector } from "react-redux";
import { selectAuthStatus, selectLoggedInUser } from "../redux";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "../components";

export const ProtectedLayout = () => {
  const user = useSelector(selectLoggedInUser);
  const authStatus = useSelector(selectAuthStatus);

  if (authStatus === "loading")
    return (
      <div className="flex w-full h-fit justify-center">
        <Loader fill="#21AAF3" />
      </div>
    );
  if (authStatus === "idle" && !user) {
    if (!user || user.role === "user")
      return <Navigate to="/" replace={true} />;
    if (user.role === "admin") return <Navigate to="/admin" replace={true} />;
  }
  return <Outlet />;
};
