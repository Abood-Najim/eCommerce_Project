import React from 'react'
import { Box, Container, Typography, Button, Paper, useTheme, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined'

export default function NotFound() {
  const { t, i18n } = useTranslation()
  const theme = useTheme()
  const isRtl = i18n.language === 'ar'

  const quickLinks = [
    {
      icon: <LocalMallOutlinedIcon color="primary" />,
      title: t('New Arrivals'),
      description: t('Discover our latest collection pieces.'),
      to: '/products'
    },
    {
      icon: <DiamondOutlinedIcon color="primary" />,
      title: t('Exclusives'),
      description: t('Member-only limited edition items.'),
      to: '/categories'
    },
    {
      icon: <HeadsetMicOutlinedIcon color="primary" />,
      title: t('Support'),
      description: t('Need help finding something specific?'),
      to: '/contact'
    }
  ]

  return (
    <Paper
      elevation={0}
      sx={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        py: { xs: 4, md: 8 },
        borderRadius: 0
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            mb: 3,
            mx: 'auto',
            maxWidth: 400,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '6.5rem', sm: '9rem', md: '11rem' },
              fontWeight: 900,
              color: alpha(theme.palette.text.primary, 0.06),
              letterSpacing: '-5px',
              position: 'relative',
              zIndex: 1,
              userSelect: 'none'
            }}
          >
            404
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              top: { xs: 10, md: 15 },
              right: isRtl ? 'auto' : { xs: 15, md: 25 },
              left: isRtl ? { xs: 15, md: 25 } : 'auto',
              width: { xs: 50, md: 75 },
              height: { xs: 50, md: 75 },
              borderRadius: '50%',
              backgroundColor: alpha(theme.palette.primary.main, 0.15),
              filter: 'blur(8px)',
              zIndex: 0
            }}
          />
        </Box>

        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 1.5,
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' }
          }}
        >
          {t('Lost in Luxury?')}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 5,
            maxWidth: 520,
            mx: 'auto',
            lineHeight: 1.6,
            px: 2,
            color: 'text.secondary',
            fontSize: { xs: '0.95rem', md: '1rem' }
          }}
        >
          {t('The page you are looking for might have been moved, removed, or is temporarily unavailable.')}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            mb: 6,
            width: '100%',
            maxWidth: 500
          }}
        >
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            disableElevation
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2.5,
              textTransform: 'none',
              fontWeight: 600,
              width: { xs: '100%', sm: 'auto' },
              flex: 1
            }}
          >
            {t('Back to Home')}
          </Button>

          <Button
            component={Link}
            to="/categories"
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2.5,
              textTransform: 'none',
              fontWeight: 600,
              borderColor: theme.palette.divider,
              color: 'text.primary',
              width: { xs: '100%', sm: 'auto' },
              flex: 1,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                bgcolor: alpha(theme.palette.primary.main, 0.04)
              }
            }}
          >
            {t('Browse Categories')}
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2.5,
            width: '100%',
            justifyContent: 'center',
            '& > *': {
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 20px)', md: '1 1 calc(33.33% - 20px)' },
              maxWidth: { xs: '100%', sm: '320px' }
            }
          }}
        >
          {quickLinks.map((item, idx) => (
            <Paper
              key={idx}
              elevation={0}
              component={Link}
              to={item.to}
              sx={{
                p: 3,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                textAlign: isRtl ? 'right' : 'left',
                bgcolor: 'background.paper',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  transform: 'translateY(-3px)'
                }
              }}
            >
              <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.5 }}>
                {item.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Paper>
  )
}