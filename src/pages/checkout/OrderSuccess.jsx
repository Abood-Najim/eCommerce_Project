import React from 'react'
import { Box, Typography, Button, Paper, Container, Chip, useTheme, Fade, Zoom, Grow } from '@mui/material'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'

export default function OrderSuccess() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const paymentMethod = location.state?.paymentMethod || 'Cash'

  return (
    <Box
      sx={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 2
      }}
    >
      <Container maxWidth="sm">
        <Fade in timeout={600}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 5 },
              textAlign: 'center',
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: 'background.paper'
            }}
          >
            <Zoom in timeout={1000}>
              <Box
                sx={{
                  width: 88,
                  height: 88,
                  borderRadius: '50%',
                  bgcolor: 'action.selected',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}
              >
                <CheckCircleOutlinedIcon sx={{ fontSize: 56, color: 'success.main' }} />
              </Box>
            </Zoom>

            <Grow in timeout={1200}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, letterSpacing: '-0.5px' }}>
                {t('Thank You for Your Order!')}
              </Typography>
            </Grow>

            <Fade in timeout={1400}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, maxWidth: 420, mx: 'auto' }}>
                {t('Your order has been placed successfully and is now being processed.')}
              </Typography>
            </Fade>

            <Fade in timeout={1600}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mb: 4,
                  borderRadius: 2.5,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: 'action.hover',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {t('Payment Method')}
                </Typography>
                <Chip
                  label={paymentMethod === 'Cash' ? t('Cash on Delivery') : t('Card Payment')}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 600, borderRadius: 1.5 }}
                />
              </Paper>
            </Fade>

            <Fade in timeout={1800}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<HomeOutlinedIcon />}
                  onClick={() => navigate('/')}
                  sx={{ textTransform: 'none', borderRadius: 2, px: 3, py: 1.2, fontWeight: 500 }}
                >
                  {t('Go to Home')}
                </Button>

                <Button
                  variant="contained"
                  startIcon={<ShoppingBagOutlinedIcon />}
                  onClick={() => navigate('/products')}
                  sx={{ textTransform: 'none', borderRadius: 2, px: 3, py: 1.2, fontWeight: 600 }}
                >
                  {t('Continue Shopping')}
                </Button>
              </Box>
            </Fade>
          </Paper>
        </Fade>
      </Container>
    </Box>
  )
}