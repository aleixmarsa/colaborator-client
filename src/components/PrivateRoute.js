import { useContext } from 'react';
import { AuthContext } from './../context/auth.context';
import { Navigate } from 'react-router-dom';

function PrivateRoute(props) {
	const { isLoggedIn, isLoading } = useContext(AuthContext);

	// If the authentication is still loading ⏳
	if (isLoading) return <p>Loading ...</p>;

	// If the user is not logged in ❌
	if (!isLoggedIn) return <Navigate to="/login" replace />;

	// If the user is logged in ✅
	return props.children;
}

export default PrivateRoute;
