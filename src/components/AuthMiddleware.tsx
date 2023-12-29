import { useEffect } from 'react';
import { useAppSelector } from '../Redux/hooks';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const AuthMiddleware = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [navigate, token]);

  let content = null;

  if (token) {
    content = <Outlet />;
  }

  return content;
};

export default AuthMiddleware;
