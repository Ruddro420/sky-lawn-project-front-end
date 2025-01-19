
import { Navigate, } from "react-router-dom";





const PrivateRoutes = ({ children }) => {
    const isLogged = localStorage.getItem("isLoggedIn");
    
    return isLogged ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;