import React from 'react'
import { Box, Slide, Typography } from '@mui/material'
import WifiOffIcon from '@mui/icons-material/WifiOff'
import { useTranslation } from 'react-i18next'
import useNetworkStatus from '../../hooks/useNetworkStatus'

export default function OfflineBanner() {
  const isOnline = useNetworkStatus()
  const { t } = useTranslation()

  return (
    <Slide direction="up" in={!isOnline} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          right: 16,
          maxWidth: 480,
          mx: 'auto',
          zIndex: (theme) => theme.zIndex.snackbar,
          bgcolor: 'warning.main',
          color: 'warning.contrastText',
          py: 1.25,
          px: 2.5,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          boxShadow: 6
        }}
      >
        <WifiOffIcon fontSize="small" />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {t('You are currently offline. Some features may be unavailable.')}
        </Typography>
      </Box>
    </Slide>
  )
}