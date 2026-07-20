import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import useCart from '../../hooks/useCart'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18next'
import useThemeStore from '../../store/useThemeStore'
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  MenuItem,
  Divider,
  Menu
} from '@mui/material'
import {
  Search as SearchIcon,
  ShoppingBagOutlined as BagIcon,
  PersonOutlined as PersonIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Login as LoginIcon,
  AccountCircle as AccountCircleIcon,
  AppRegistration as AppRegistrationIcon,
  Logout as LogoutIcon
} from '@mui/icons-material'

export default function Navbar() {
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)
  const { data } = useCart()
  const cartCount = data?.items.length || 0
  const { t } = useTranslation()
  const { mode, toggleMode } = useThemeStore()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [profileMenu, setProfileMenu] = useState(null);
  const isProfileMenuOpen = Boolean(profileMenu);
  
  const handleProfileMenuOpen = (event) => {
    setProfileMenu(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setProfileMenu(null);
  };

  const changeLanguage = () => {
    const newLng = i18n.language === "ar" ? "en" : "ar"
    i18n.changeLanguage(newLng)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
    handleProfileMenuClose()
  }


  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0} 
      sx={{ 
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderRadius: 0
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        <Typography
          variant="h4"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: theme.palette.primary.main,
            fontWeight: 700,
            letterSpacing: '-0.5px',
          }}
        >
          Lumina Luxe
        </Typography>

        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Link to="/products" style={{ textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 500 }}>
              {t('Products')}
            </Link>
            <Link to="/" style={{ textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 500 }}>
              {t('Categories')}
            </Link>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>

          <IconButton component={Link} to="/cart" color="inherit">
            <Badge badgeContent={cartCount} color="error" overlap="circular">
              <BagIcon />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleProfileMenuOpen}
            size="small"
            sx={{ ml: 0.5 }}
            aria-controls={isProfileMenuOpen ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isProfileMenuOpen ? 'true' : undefined}
          >
            <PersonIcon />
          </IconButton>

          <Menu
            disableScrollLock
            anchorEl={profileMenu}
            id="profile-menu"
            open={isProfileMenuOpen}
            onClose={handleProfileMenuClose}
            onClick={handleProfileMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              elevation: 2,
              sx: {
                minWidth: 160,
                borderRadius: 2,
                mt: 1.5,
              }
            }}
          >
            {token ? (
              [
                <MenuItem key="profile" component={Link} to="/profile" sx={{ gap: 1.5 }}>
                  <AccountCircleIcon fontSize="small" /> {t('Profile')}
                </MenuItem>,
                <Divider key="divider" />,
                <MenuItem key="logout" onClick={handleLogout} sx={{ color: 'error.main', gap: 1.5 }}>
                  <LogoutIcon fontSize="small" /> {t('Logout')}
                </MenuItem>
              ]
            ) : (
              [
                <MenuItem key="login" component={Link} to="/login" sx={{ gap: 1.5 }}>
                  <LoginIcon fontSize="small" /> {t('Login')}
                </MenuItem>,
                <MenuItem key="register" component={Link} to="/register" sx={{ gap: 1.5 }}>
                  <AppRegistrationIcon fontSize="small" /> {t('Register')}
                </MenuItem>
              ]
            )}
          </Menu>

          <Button onClick={changeLanguage} variant="outlined" size="small" sx={{ ml: 1, minWidth: 'auto', px: 1.5 }}>
            {i18n.language === "ar"?"English":"العربية"}
          </Button>

          <IconButton onClick={toggleMode} color="inherit">
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

        </Box>
      </Toolbar>
    </AppBar>
  )
}