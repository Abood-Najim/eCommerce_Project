import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'

export default function MainLayout() {
  const location = useLocation();
  return (
    <>
    <Navbar />
    <Outlet />
    {location.pathname !== '/register' && location.pathname !== '/login' && <Footer />}
    </>
  )
}
