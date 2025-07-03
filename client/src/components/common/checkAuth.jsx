import {Navigate, useLocation} from "react-router-dom";


function CheckAuth({isAuthenticated, user, children}) {
    const location = useLocation();
    const path = location.pathname;


    // Allow unauthenticated access only to /auth/* and /public/*
    if (
        !isAuthenticated &&
        !path.startsWith("/auth/login") &&
        !path.startsWith("/auth/register") &&
        !path.startsWith("/public")
    ) {
        return <Navigate to="/auth/login"/>;
    }

    // If authenticated and trying to visit login/register
    if (
        isAuthenticated &&
        (path.startsWith("/auth/login") || path.startsWith("/auth/register"))
    ) {
        if (user?.role === "admin") {
            return <Navigate to="/admin/panel"/>;
        } else if (user?.role === "editor") {
            return <Navigate to="/editor/panel"/>;
        } else {
            return <Navigate to="/private/listing"/>;
        }
    }

    // Prevent non-admin from accessing /admin
    if (
        isAuthenticated &&
        user?.role !== "admin" &&
        path.startsWith("/admin")
    ) {
        return <Navigate to="un-auth"/>;
    }

    // Prevent admin from accessing /editor or /private
    if (
        isAuthenticated &&
        user?.role === "admin" &&
        (path.startsWith("/editor") || path.startsWith("/private"))
    ) {
        return <Navigate to="/admin/panel"/>;
    }

    return <>{children}</>;
}

export default CheckAuth;
