import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, isAdminRoute = false, isAuthenticated, isAdmin }) => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            // Wait for a short delay before redirecting
            setTimeout(() => setRedirect(true), 2000); // 2 seconds delay
        }
    }, [isAuthenticated]);

    // Show unauthorized message if not authenticated
    if (!isAuthenticated && !redirect) {
        return <h2>Unauthorized - You must be logged in</h2>;
    }

    // Redirect to login page after the delay
    if (!isAuthenticated && redirect) {
        return <Navigate to="/login" state={{ error: 'Authorization failed! No success.' }} />;
    }

    // Redirect to dashboard if trying to access admin routes without admin role
    if (isAdminRoute && !isAdmin) {
        return <Navigate to="/admindash" />;
    }

    // Render the requested route if conditions are met
    return children;
};

export default ProtectedRoute;