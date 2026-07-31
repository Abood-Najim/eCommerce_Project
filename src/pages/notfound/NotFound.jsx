import React from 'react'
import { Box, Container, Typography, Button, Paper, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import DiamondIcon from '@mui/icons-material/Diamond'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'

export default function NotFound() {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Paper sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'background.default', py: 6,borderRadius:0 }}>
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Box sx={{ position: 'relative', mb: 4, mx: 'auto', maxWidth: 400, display: 'flex', justifyContent: 'center' }}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '6rem', sm: '8rem', md: '10rem' }, 
              fontWeight: 900, 
              color: alpha(theme.palette.text.primary, 0.05),
              letterSpacing: '-5px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            404
          </Typography>
          <Box 
            sx={{ 
              position: 'absolute', 
              top: { xs: -10, md: -20 }, 
              right: { xs: -20, md: -40 }, 
              width: { xs: 40, md: 60 }, 
              height: { xs: 40, md: 60 }, 
              borderRadius: '50%', 
              backgroundColor: alpha(theme.palette.primary.main, 0.15),
              zIndex: 0
            }} 
          />
        </Box>

        <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 2, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
          {t('Lost in Luxury?')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 500, mx: 'auto', lineHeight: 1.6, px: 2 }}>
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
            width: '100%' 
          }}
        >
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            size="large"
            sx={{ 
              px: 4, 
              py: 1.5, 
              borderRadius: 3, 
              textTransform: 'none', 
              fontWeight: 600,
              width: { xs: '100%', sm: 'auto' },
              maxWidth: 300,
              boxShadow: `0px 4px 14px ${alpha(theme.palette.primary.main, 0.3)}`
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
              borderRadius: 3, 
              textTransform: 'none', 
              fontWeight: 600,
              width: { xs: '100%', sm: 'auto' },
              maxWidth: 300
            }}
          >
            {t('Browse Categories')}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, width: '100%', justifyContent: 'center' }}>
          <Paper elevation={0} sx={{ flex: 1, p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, textAlign: 'left', maxWidth: { xs: '100%', md: 300 } }}>
            <Box sx={{ color: theme.palette.primary.main, mb: 1 }}>
              <LocalMallIcon />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {t('New Arrivals')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('Discover our latest collection pieces.')}
            </Typography>
          </Paper>

          <Paper elevation={0} sx={{ flex: 1, p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, textAlign: 'left', maxWidth: { xs: '100%', md: 300 } }}>
            <Box sx={{ color: theme.palette.primary.main, mb: 1 }}>
              <DiamondIcon />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {t('Exclusives')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('Member-only limited edition items.')}
            </Typography>
          </Paper>

          <Paper elevation={0} sx={{ flex: 1, p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, textAlign: 'left', maxWidth: { xs: '100%', md: 300 } }}>
            <Box sx={{ color: theme.palette.primary.main, mb: 1 }}>
              <HeadsetMicIcon />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {t('Support')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('Need help finding something specific?')}
            </Typography>
          </Paper>
        </Box>

      </Container>
    </Paper>
  )
}