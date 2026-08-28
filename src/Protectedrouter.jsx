import React, { useEffect } from 'react'
import useAuthStore from './store/useAuthStore'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'
export default function Protectedrouter({children}) {

  const token = useAuthStore((state) => state.token);
  const { t } = useTranslation();

  useEffect(() => {
    if (!token) {
      toast.warning(t('Please login to access this page'));
    }
  }, [token, t]);
  if(!token){
    return <Navigate to='/login' />;
  }
  
  return children;
}