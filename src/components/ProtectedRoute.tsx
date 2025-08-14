import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import LoginRequired from './LoginRequired';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  if (!user || !token) {
    return <LoginRequired />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
