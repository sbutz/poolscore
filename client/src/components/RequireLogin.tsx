import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/AuthProvider';

interface RequireProps {
  children: JSX.Element;
}
export default function RequireLogin({ children } : RequireProps) {
  const { userId, userIdLoading } = useAuth();

  if (!userId && !userIdLoading) return <Navigate to="/login" replace />;

  return children;
}
