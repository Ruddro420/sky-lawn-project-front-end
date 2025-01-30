
import { Navigate, } from "react-router-dom";





const PrivateRoutes = ({ children }) => {
    const isLogged = localStorage.getItem("isLoggedIn");

    return isLogged ? children : <Navigate to="/login" />;
    // return children;
};

export default PrivateRoutes;