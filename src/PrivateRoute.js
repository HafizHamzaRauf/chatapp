import { useContext } from "react";
import { Context } from "./context";
import { Navigate, useNavigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { token } = useContext(Context); // Access the token from your context

  if (!token.trim()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
