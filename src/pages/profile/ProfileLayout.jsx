import React from 'react'
import { Box, Container, Paper, Typography, Avatar, Divider, Button, useTheme, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import useProfile from '../../hooks/useProfile'

export default function ProfileLayout() {
  const { t } = useTranslation()
  const theme = useTheme()
  const location = useLocation()

  const { data, isLoading } = useProfile()
  const profile = data?.response || data || {}

  const isActive = (path) => {
    if (path === '' && location.pathname === '/profile') return true
    if (path !== '' && location.pathname.includes(path)) return true
    return false
  }

  if (isLoading) return <CircularProgress />

  return (
    <Container maxWidth="xxl" sx={{ py: 6, px: { xs: 2, md: 4 } }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start' ,minHeight:'75vh'}}>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            borderRadius: 3, 
            border: `1px solid ${theme.palette.divider}`,
            width: { xs: '100%', md: 300 },
            flexShrink: 0
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar 
              sx={{ 
                width: 120, 
                height: 120, 
                mb: 2, 
                bgcolor: theme.palette.primary.main,
                fontSize: '3rem'
              }}
            >
              {profile.fullName?.charAt(0) || 'U'}
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {profile.fullName || t('User')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('Member since')} {new Date().getFullYear()}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {profile.orders?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('Orders')}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                —
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('Points')}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              component={Link}
              to="/profile"
              variant={isActive('') ? 'contained' : 'text'}
              startIcon={<PersonOutlineOutlinedIcon />}
              fullWidth
              sx={{ 
                justifyContent: 'flex-start', 
                textTransform: 'none', 
                fontWeight: 600,
                py: 1.5,
                borderRadius: 2
              }}
            >
              {t('Personal Info')}
            </Button>

            <Button
              component={Link}
              to="/profile/orders"
              variant={isActive('orders') ? 'contained' : 'text'}
              startIcon={<ReceiptLongIcon />}
              fullWidth
              sx={{ 
                justifyContent: 'flex-start', 
                textTransform: 'none', 
                fontWeight: 600,
                py: 1.5,
                borderRadius: 2
              }}
            >
              {t('Order History')}
            </Button>
          </Box>
        </Paper>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Outlet />
        </Box>

      </Box>
    </Container>
  )
}