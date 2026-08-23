import React from 'react'
import {
  Box, Container, Paper, Typography, Avatar, Divider, Button,
  useTheme, CircularProgress, Stack, Chip, Fade, Slide, Grow
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
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

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 3, md: 4 },
          alignItems: 'flex-start',
          minHeight: '75vh'
        }}
      >
        <Slide direction="right" in timeout={600}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              width: { xs: '100%', md: 320 },
              flexShrink: 0,
              backgroundColor: 'background.paper',
              boxShadow: theme.palette.mode === 'dark' ? '0px 10px 30px rgba(0,0,0,0.3)' : '0px 10px 30px rgba(0,0,0,0.03)'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Grow in timeout={800}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 2,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    boxShadow: `0 8px 20px ${theme.palette.primary.main}33`
                  }}
                >
                  {profile.fullName?.charAt(0) || 'U'}
                </Avatar>
              </Grow>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', textAlign: 'center' }}>
                {profile.fullName || t('User')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {profile.email || '—'}
              </Typography>
              <Chip
                icon={<VerifiedUserIcon style={{ fontSize: 14 }} />}
                label={t('Verified Member')}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ borderRadius: 2, height: 24, fontSize: '0.75rem' }}
              />
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                p: 2,
                mb: 3,
                borderRadius: 3,
                bgcolor: theme.palette.mode === 'dark' ? 'action.hover' : 'grey.50',
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <Box sx={{ flex: 1, textAlign: 'center', px: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', lineHeight: 1.2 }}>
                  {profile.orders?.length || 0}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, display: 'block', mt: 0.5 }}>
                  {t('Orders')}
                </Typography>
              </Box>

              <Divider orientation="vertical" flexItem />

              <Box sx={{ flex: 1, textAlign: 'center', px: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', lineHeight: 1.2 }}>
                  0
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, display: 'block', mt: 0.5 }}>
                  {t('Points')}
                </Typography>
              </Box>
            </Box>

            <Stack spacing={1}>
              <Button
                component={Link}
                to="/profile"
                variant={isActive('') ? 'contained' : 'text'}
                startIcon={<PersonOutlineOutlinedIcon />}
                fullWidth
                sx={{
                  justifyContent: 'center',
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.2,
                  px: 2,
                  borderRadius: 2.5,
                  color: isActive('') ? 'primary.contrastText' : 'text.secondary',
                  '&:hover': {
                    backgroundColor: isActive('') ? 'primary.dark' : 'action.hover'
                  }
                }}
              >
                {t('Personal Info')}
              </Button>

              <Button
                component={Link}
                to="/profile/orders"
                variant={isActive('orders') ? 'contained' : 'text'}
                startIcon={<ReceiptLongOutlinedIcon />}
                fullWidth
                sx={{
                  justifyContent: 'center',
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.2,
                  px: 2,
                  borderRadius: 2.5,
                  color: isActive('orders') ? 'primary.contrastText' : 'text.secondary',
                  '&:hover': {
                    backgroundColor: isActive('orders') ? 'primary.dark' : 'action.hover'
                  }
                }}
              >
                {t('Order History')}
              </Button>
            </Stack>
          </Paper>
        </Slide>

        <Fade in timeout={800}>
          <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
            <Outlet />
          </Box>
        </Fade>
      </Box>
    </Container>
  )
}