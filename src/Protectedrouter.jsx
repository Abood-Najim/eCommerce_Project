import React from 'react'
import useAuthStore from './store/useAuthStore'
import { Navigate } from 'react-router-dom';

export default function Protectedrouter({children}) {

  const token =useAuthStore((state)=>state.token);

  if(!token){
    return <Navigate to='/login' />;
  }
  return children;
}


