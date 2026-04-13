import { Navigate, Outlet } from "react-router-dom";
import { verifyToken } from "../utils/jwt";

export const ProtectedRoutes = () => {
    const token = localStorage.getItem("token");
    // console.log('protectedroute token --> ',token);
    if (!token || !verifyToken(token)) return <Navigate to="/login" />;
    return <Outlet />
};