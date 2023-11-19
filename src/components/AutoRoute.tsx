import { getToken } from '@/utils';
import { Navigate } from 'react-router-dom';

export function AuthRoute({ children }: any) {
  const token = getToken();

  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to={'/login'} replace />;
  }
}
