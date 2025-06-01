import PropTypes from "prop-types"

import LoadingSpinner from "../components/Shared/LoadingSpinner";
import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";

const AdminRoute = ({children}) => {
  const [role,isLoading] = useRole()
  

  if (isLoading) return <LoadingSpinner />
  if (role === 'admin') return children
  return <Navigate to='/dashboard' replace='true' />
}

AdminRoute.propTypes = {
  children: PropTypes.element,
}


export default AdminRoute;