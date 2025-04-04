import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../store/AuthProvider';

interface RequireProps {
  children: JSX.Element;
}
export default function RequireLogin({ children } : RequireProps) {
  const { userId, loading } = useAuth();
  const location = useLocation();

  if (!userId && !loading) return <Navigate to="/login" state={{ target: location }} replace />;

  return children;
}
