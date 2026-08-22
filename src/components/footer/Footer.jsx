import React from 'react'
import { Box, Typography, IconButton, Divider, useTheme, Paper, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  Language as LanguageIcon,
  Share as ShareIcon,
  Public as PublicIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as AccountBalanceIcon,
  Payments as PaymentsIcon
} from '@mui/icons-material'

export default function Footer() {
  const { t } = useTranslation()
  const theme = useTheme()

  const linkStyle = {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'color 0.2s',
    '&:hover': {
      color: theme.palette.primary.main
    }
  }

  const handleSocialClick = (platformName) => {
    toast.info(`${t('Opening')} ${platformName}...`)
  }

  return (
    <Paper 
      component="footer" 
      sx={{  
        pt: 8, 
        pb: 4, 
        backgroundColor: 'background.default', 
        borderTop: 1, 
        borderColor: 'divider', 
        width: '100%',
        borderRadius: 0,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 6, md: 4 }, mb: 6 }}>
          
          <Box sx={{ maxWidth: { xs: '100%', md: 300 }, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'start' } }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 2, letterSpacing: '-0.5px' }}>
              Lumina Luxe
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6, textAlign: { xs: 'center', md: 'start' } }}>
              {t('Redefining digital lifestyle through precision engineering and visionary design.')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <IconButton 
                onClick={() => handleSocialClick(t('Website'))}
                sx={{ backgroundColor: 'action.hover', color: 'primary.main', '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}
              >
                <LanguageIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => handleSocialClick(t('Share'))}
                sx={{ backgroundColor: 'action.hover', color: 'primary.main', '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}
              >
                <ShareIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => handleSocialClick(t('Global Network'))}
                sx={{ backgroundColor: 'action.hover', color: 'primary.main', '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}
              >
                <PublicIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: { xs: 'center', md: 'space-between' }, 
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: { xs: 4, md: 2 },
            flex: 1
          }}>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', mb: 2, color: 'text.primary' }}>
                {t('Shop')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: { xs: 'center', md: 'flex-start' } }}>
                <Typography component={Link} to="/products" sx={linkStyle}>{t('All Products')}</Typography>
                <Typography component={Link} to="/products?filter=new" sx={linkStyle}>{t('New Arrivals')}</Typography>
                <Typography component={Link} to="/categories" sx={linkStyle}>{t('Collections')}</Typography>
                <Typography component={Link} to="/products?filter=limited" sx={linkStyle}>{t('Limited Drops')}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', mb: 2, color: 'text.primary' }}>
                {t('Support')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: { xs: 'center', md: 'flex-start' } }}>
                <Typography component={Link} to="/shipping" sx={linkStyle}>{t('Shipping Info')}</Typography>
                <Typography component={Link} to="/returns" sx={linkStyle}>{t('Returns & Exchanges')}</Typography>
                <Typography component={Link} to="/contact" sx={linkStyle}>{t('Contact Us')}</Typography>
                <Typography component={Link} to="/aboutus" sx={linkStyle}>{t('Sustainability')}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', mb: 2, color: 'text.primary' }}>
                {t('Legal')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: { xs: 'center', md: 'flex-start' } }}>
                <Typography component={Link} to="/privacy" sx={linkStyle}>{t('Privacy Policy')}</Typography>
                <Typography component={Link} to="/terms" sx={linkStyle}>{t('Terms of Service')}</Typography>
                <Typography component={Link} to="/cookies" sx={linkStyle}>{t('Cookie Policy')}</Typography>
              </Box>
            </Box>

          </Box>

        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mt: { xs: 2, md: 0 } }}>
            &copy; {new Date().getFullYear()} Lumina Luxe. {t('All rights reserved.')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <IconButton size="small" color="inherit"><CreditCardIcon fontSize="small" /></IconButton>
            <IconButton size="small" color="inherit"><AccountBalanceIcon fontSize="small" /></IconButton>
            <IconButton size="small" color="inherit"><PaymentsIcon fontSize="small" /></IconButton>
          </Box>
        </Box>
      </Container>
    </Paper>
  )
}