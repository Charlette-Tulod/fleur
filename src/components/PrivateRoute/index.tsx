import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
