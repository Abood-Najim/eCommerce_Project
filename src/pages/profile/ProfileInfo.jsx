import React, { useState } from 'react'
import { Box, Paper, Typography, CircularProgress, Button, useTheme, Modal, TextField, IconButton, Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useProfile from '../../hooks/useProfile'
import useUpdateProfile from '../../hooks/useUpdateProfile'
import CloseIcon from '@mui/icons-material/Close'

export default function ProfileInfo() {
  const { t } = useTranslation()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  
  const { data, isLoading, isError, error } = useProfile()
  const { mutate: updateProfile, isPending } = useUpdateProfile()
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: ''
  })
  
  if (isLoading) return <CircularProgress />
  if (isError) return <Typography color='error'>{error.message}</Typography>
  
  const profile = data?.response || data || {}
  
  const handleOpen = () => {
    setFormData({
      fullName: profile.fullName || '',
      phoneNumber: profile.phoneNumber || ''
    })
    setOpen(true)
  }
  
  const handleClose = () => setOpen(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile(formData, {
      onSuccess: () => {
        handleClose()
      }
    })
  }
  
  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
          {t('Personal Information')}
        </Typography>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={handleOpen}
          sx={{ textTransform: 'none', borderRadius: 2 }}
          >
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

    {/*i made the update info as a model actually i was in a hurry so i didn't make as a new page*/} 
      <Modal open={open} onClose={handleClose} disableScrollLock={true}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 },
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          p: 4
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {t('Update Profile')}
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label={t('Full Name')}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            <TextField
              fullWidth
              label={t('Phone Number')}
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
            <Button 
              type="submit" 
              variant="contained" 
              disabled={isPending}
              sx={{ mt: 1, textTransform: 'none', borderRadius: 2 }}
            >
              {isPending ? <CircularProgress size={24} color="inherit" /> : t('Save Changes')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  )
}