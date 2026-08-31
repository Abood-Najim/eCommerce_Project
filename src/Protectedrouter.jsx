import React, { useEffect } from 'react';
import useAuthStore from './store/useAuthStore';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useCart from './hooks/useCart';

export default function Protectedrouter({ children }) {
  const token = useAuthStore((state) => state.token);
  const { t } = useTranslation();
  const location = useLocation();
  
  const { data } = useCart();
  const items = data?.items || [];

  useEffect(() => {
    if (!token) {
      toast.warning(t('Please login to access this page'));
    }

    if (token && location.pathname === '/checkout' && items.length === 0) {
      toast.dismiss();
      toast.warning(t('Your Cart Is Empty Buy Something'));
    }
  }, [token, t, location.pathname, items.length]);

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  if (location.pathname === '/checkout' && items.length === 0) {
    return <Navigate to='/cart'/>;
  }
  
  return children;
}
