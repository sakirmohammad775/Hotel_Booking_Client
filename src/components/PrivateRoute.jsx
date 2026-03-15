
import { Navigate } from "react-router";
import useAuthContext from "../Hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  if (user === null) return <p>Loading...</p>;
  return user ? children : <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;