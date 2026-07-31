import React from 'react'
import { Box, Container, Typography, Paper, TextField, Button, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'

export default function ContactUs() {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Paper sx={{ py: 6, px: { xs: 2, md: 4 }, backgroundColor: 'background.default', minHeight: '100vh',borderRadius:0 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1, textAlign: 'center' }}>
          {t('Contact Us')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 6, maxWidth: 600, mx: 'auto' }}>
          {t('Have a question or need assistance? We are here to help. Reach out to us anytime.')}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'stretch' }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                {t('Get in Touch')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {t('We would love to hear from you. Whether you have a question about products, need assistance with your order, or just want to share feedback, our team is ready to help.')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <EmailOutlinedIcon sx={{ color: theme.palette.primary.main }} />
                <Typography variant="body2">support@luminaluxe.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PhoneOutlinedIcon sx={{ color: theme.palette.primary.main }} />
                <Typography variant="body2">+972 59923515</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LocationOnOutlinedIcon sx={{ color: theme.palette.primary.main }} />
                <Typography variant="body2">Luxury Avenue, Palestine, JN 29754</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              {t('Send us a Message')}
            </Typography>

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <TextField fullWidth label={t('Full Name')} variant="outlined" />
                <TextField fullWidth label={t('Email Address')} variant="outlined" type="email" />
              </Box>
              <TextField fullWidth label={t('Subject')} variant="outlined" />
              <TextField fullWidth label={t('Message')} variant="outlined" multiline rows={4} />
              <Button 
                variant="contained" 
                size="large" 
                sx={{ 
                  textTransform: 'none', 
                  borderRadius: 2, 
                  px: 4, 
                  py: 1.2, 
                  width: { xs: '100%', sm: 'auto' } 
                }}
              >
                {t('Send Message')}
              </Button>
            </Box>
          </Paper>

        </Box>
      </Container>
    </Paper>
  )
}
