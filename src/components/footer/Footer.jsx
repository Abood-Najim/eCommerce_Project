import React from 'react'
import { Box, Typography, IconButton, Divider, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
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

  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: 8, 
        pt: 8, 
        pb: 4, 
        px: { xs: 3, md: 8 }, 
        backgroundColor: 'background.default', 
        borderTop: 1, 
        borderColor: 'divider', 
        width: '100%' 
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 6, md: 4 }, mb: 6 }}>
        
        <Box sx={{ maxWidth: { xs: '100%', md: 300 }, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 2, letterSpacing: '-0.5px' }}>
            Lumina Luxe
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
            {t('Redefining digital lifestyle through precision engineering and visionary design.')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <IconButton sx={{ backgroundColor: 'action.hover', color: 'primary.main', '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}>
              <LanguageIcon fontSize="small" />
            </IconButton>
            <IconButton sx={{ backgroundColor: 'action.hover', color: 'primary.main', '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}>
              <ShareIcon fontSize="small" />
            </IconButton>
            <IconButton sx={{ backgroundColor: 'action.hover', color: 'primary.main', '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}>
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
              <div style={{ color: theme.palette.text.secondary, cursor: 'pointer' }}>{t('All Products')}</div>
              <div style={{ color: theme.palette.text.secondary, cursor: 'pointer' }}>{t('New Arrivals')}</div>
              <div style={{ color: theme.palette.text.secondary, cursor: 'pointer' }}>{t('Collections')}</div>
              <div style={{ color: theme.palette.text.secondary, cursor: 'pointer' }}>{t('Limited Drops')}</div>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', mb: 2, color: 'text.primary' }}>
              {t('Support')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: { xs: 'center', md: 'flex-start' } }}>
              <div style={{ color: theme.palette.text.secondary, cursor: 'pointer' }}>{t('Shipping Info')}</div>
              <div style={{ color: theme.palette.text.secondary, cursor: 'pointer' }}>{t('Returns & Exchanges')}</div>
              <div style={{ color: theme.palette.text.secondary, cursor: 'pointer' }}>{t('Contact Us')}</div>
              <div style={{ color: theme.palette.text.secondary, cursor: 'pointer' }}>{t('Sustainability')}</div>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', mb: 2, color: 'text.primary' }}>
              {t('Legal')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: { xs: 'center', md: 'flex-start' } }}>
              <div style={{ color: theme.palette.text.secondary, cursor: 'pointer' }}>{t('Privacy Policy')}</div>
              <div style={{ color: theme.palette.text.secondary, cursor: 'pointer' }}>{t('Terms of Service')}</div>
              <div style={{ color: theme.palette.text.secondary, cursor: 'pointer' }}>{t('Cookie Policy')}</div>
            </Box>
          </Box>

        </Box>

      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mt: { xs: 2, md: 0 } }}>
          &copy; 2024 Lumina Luxe. {t('All rights reserved.')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <IconButton size="small" color="inherit"><CreditCardIcon fontSize="small" /></IconButton>
          <IconButton size="small" color="inherit"><AccountBalanceIcon fontSize="small" /></IconButton>
          <IconButton size="small" color="inherit"><PaymentsIcon fontSize="small" /></IconButton>
        </Box>
      </Box>
    </Box>
  )
}