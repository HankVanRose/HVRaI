import { observer } from 'mobx-react-lite';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import UserStore from '../stores/UserStore';

const ProtectedRoute = observer(() => {
  const location = useLocation();

  if (!UserStore.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
});

export default ProtectedRoute;
