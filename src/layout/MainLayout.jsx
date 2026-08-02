import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import LoginPrompt from '../components/auth/LoginPrompt'
import { Outlet, useLocation } from 'react-router-dom'

export default function MainLayout() {
  const location = useLocation();
  return (
    <>
    <LoginPrompt />
    {location.pathname !== '/resetPassword' && location.pathname !== '/verifyCode' && location.pathname !== '/setNewPass' && <Navbar />}
    <Outlet />
    {location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/resetPassword' &&
    location.pathname !== '/verifyCode' && location.pathname !== '/setNewPass' && <Footer />}
    </>
  )
}
