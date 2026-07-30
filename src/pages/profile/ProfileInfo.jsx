import React from 'react'
import { Box, Paper, Typography, CircularProgress, Button, useTheme, Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useProfile from '../../hooks/useProfile'

export default function ProfileInfo() {
  const { t } = useTranslation()
  const theme = useTheme()

  const { data, isLoading, isError, error } = useProfile()

  if (isLoading) return <CircularProgress />
  if (isError) return <Typography color='error'>{error.message}</Typography>

  const profile = data?.response || data || {}

  return (
    <Paper elevation={0} sx={{ p: 10, borderRadius: 3, border: `1px solid ${theme.palette.divider}` ,  }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
          {t('Personal Information')}
        </Typography>
        <Button variant="outlined" size="small" sx={{ textTransform: 'none', borderRadius: 2 }}>
          {t('Update Profile')}
        </Button>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 0.5 }}>
            {t('Full Name')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.primary' }}>
            {profile.fullName || '—'}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 0.5 }}>
            {t('Email Address')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.primary' }}>
            {profile.email || '—'}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 0.5 }}>
            {t('Phone Number')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.primary' }}>
            {profile.phoneNumber || '—'}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}