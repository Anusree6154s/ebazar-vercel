import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthStatus, selectLoggedInUser } from "../../redux";
import Loader from "../common/Loader";

function Protected({ children }) {
  const user = useSelector(selectLoggedInUser);
  const authStatus = useSelector(selectAuthStatus);

  if (authStatus === "loading") return <Loader />;
  if (authStatus === "idle" && !user) {
    if (!user || user.role === "user")
      return <Navigate to="/" replace={true} />;
    if (user.role === "admin") return <Navigate to="/admin" replace={true} />;
  }
  return children;
}

export default Protected;
