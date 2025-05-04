import PropTypes from "prop-types";
import useRole from "./../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const SellerRoute = ({ children }) => {
    const [role, isLoading] = useRole();

    if (isLoading) return <LoadingSpinner />;
    if (role === "seller") return children;
    return <Navigate to="/dashboard" replace="true" />;
};



export default SellerRoute;
