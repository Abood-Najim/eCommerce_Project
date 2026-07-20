import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import useCart from '../../hooks/useCart';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18next';
import { Button } from '@mui/material';
import useThemeStore from '../../store/useThemeStore';

export default function Navbar() {
  
  const navigate =useNavigate();
  const token = useAuthStore((state)=>state.token);
  const logout = useAuthStore((state)=>state.logout);
  const {data}=useCart();
  const cartCount = data?.items.length || 0;
  const {t} = useTranslation();
  const changeLanguage = () =>{
    const newLng = i18n.language === "ar"?"en":"ar"
    i18n.changeLanguage(newLng);
  }
  const handleLogout =()=>{
    logout();
    navigate('/login')
  }
  const {mode,toggleMode} = useThemeStore();

  return (
    <nav>
      <Link to="/">{t('Home')}</Link>
      <Link to="/products">{t('Products')}</Link>

      {token? <>
        <Link to="/cart">{t('Cart')} {cartCount}</Link>
        <Link to="/profile">{t('Profile')}</Link>
        <Link to="/login" component="button" onClick={logout}>{t('Logout')}</Link>
      </>:
      <>
      <Link to="/login">{t('Login')}</Link>
        <Link to="/register">{t('Register')}</Link>
      </>
      }
      <Button onClick={changeLanguage}>
        {i18n.language === "ar"?"English":"العربية"}
      </Button>
      <Button onClick={toggleMode}>
        {mode === "light"?"Dark":"Light"}
      </Button>
    </nav>
  )
}
