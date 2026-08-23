import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import useCart from '../../hooks/useCart'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18next'
import useThemeStore from '../../store/useThemeStore'
import { toast } from 'react-toastify'
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
  Menu,
  Drawer,
  Container
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
  Logout as LogoutIcon,
  Menu as MenuIcon
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

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const changeLanguage = () => {
    const newLng = i18n.language === "ar" ? "en" : "ar"
    i18n.changeLanguage(newLng)
    toast.success(newLng === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Language changed to English')
  }

  const handleLogout = () => {
    logout()
    toast.success(t('Successfully logged out'))
    navigate('/login')
    handleProfileMenuClose()
    setDrawerOpen(false)
  }
  const handleCartClick = (e) => {
    if (!token) {
      e.preventDefault()
      toast.error(t('Please log in to view your cart'))
      navigate('/login')
    }
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
      <Container maxWidth="xl" disableGutters>
        <Toolbar sx={{ justifyContent: 'space-between' }}>

          <Typography
            variant="h4"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: theme.palette.primary.main, fontWeight: 700, letterSpacing: '-0.5px', }}>
            Lumina Luxe
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
            <Link to="/products" style={{ textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 500 }}>
              {t('Products')}
            </Link>
            <Link to="/categories" style={{ textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 500 }}>
              {t('Categories')}
            </Link>
            <Link to="/contact" style={{ textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 500 }}>
              {t('Contact Us')}
            </Link>
            <Link to="/aboutus" style={{ textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 500 }}>
              {t('About')}
            </Link>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>

            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.5 }}>
              <IconButton component={Link} to="/cart" onClick={handleCartClick} color="inherit">
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

              <Button onClick={changeLanguage} variant="outlined" size="small" sx={{ minWidth: 'auto', px: 1.5 }}>
                {i18n.language === "ar" ? "English" : "العربية"}
              </Button>

              <IconButton onClick={toggleMode} color="inherit">
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Box>
            {isMobile && (
              <IconButton onClick={toggleDrawer(true)} edge="end" color="inherit">
                <MenuIcon />
              </IconButton>
            )}

          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Link to="/products" style={{ textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 500 }}>
            {t('Products')}
          </Link>
          <Link to="/" style={{ textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 500 }}>
            {t('Categories')}
          </Link>
          <Link to="/contact" style={{ textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 500 }}>
            {t('Contact Us')}
          </Link>
          <Link to="/aboutus" style={{ textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 500 }}>
            {t('About')}
          </Link>

          <Divider />

          <Link to="/cart" onClick={handleCartClick} style={{ textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 500 }}>
            {t('Cart')} ({cartCount})
          </Link>

          {token ? (
            <>
              <Link to="/profile" style={{ textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 500 }}>
                {t('Profile')}
              </Link>
              <Box
                onClick={handleLogout}
                sx={{
                  color: 'error.main',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
              >
                {t('Logout')}
              </Box>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 500 }}>
                {t('Login')}
              </Link>
              <Link to="/register" style={{ textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 500 }}>
                {t('Register')}
              </Link>
            </>
          )}

          <Divider />

          <Button onClick={changeLanguage} variant="outlined" size="small" sx={{ justifyContent: 'flex-start' }}>
            {i18n.language === "ar" ? "English" : "العربية"}
          </Button>
          <Button onClick={toggleMode} variant="outlined" size="small" sx={{ justifyContent: 'flex-start' }}>
            {mode === 'light' ? "Dark Mode" : "Light Mode"}
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  )
}