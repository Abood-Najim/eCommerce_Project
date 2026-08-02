import React, { useState } from 'react'
import { Box, Paper, Typography, CircularProgress, Button, useTheme, Modal, TextField, IconButton, Divider, InputAdornment } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useProfile from '../../hooks/useProfile'
import useUpdateProfile from '../../hooks/useUpdateProfile'
import useUpdateEmail from '../../hooks/useUpdateEmail'
import useChangePassword from '../../hooks/useChangePassword'
import useAuthStore from '../../store/useAuthStore';
import useLoginPromptStore from '../../store/useLoginPromptStore';
import CloseIcon from '@mui/icons-material/Close'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export default function ProfileInfo() {
  const { t } = useTranslation()
  const theme = useTheme()
  const token = useAuthStore((state) => state.token);
  const openLoginPrompt = useLoginPromptStore((state) => state.openLoginPrompt);
  const [open, setOpen] = useState(false)
  const [emailOpen, setEmailOpen] = useState(false)
  const [passwordOpen, setPasswordOpen] = useState(false)

  const { data, isLoading, isError, error } = useProfile()
  const { mutate: updateProfile, isPending } = useUpdateProfile()
  const { mutate: updateEmail, isPending: emailPending } = useUpdateEmail()
  const { mutate: changePassword, isPending: passwordPending } = useChangePassword()

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: ''
  })

  const [emailData, setEmailData] = useState({
    newEmail: ''
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  if (isLoading) return <CircularProgress />
  if (isError) return <Typography color='error'>{error.message}</Typography>

  const profile = data?.response || data || {}

  const handleOpen = () => {
    if (!token) {
      openLoginPrompt();
      return;
    }
    setFormData({
      fullName: profile.fullName || '',
      phoneNumber: profile.phoneNumber || ''
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false)

  const handleEmailOpen = () => {
    if (!token) {
      openLoginPrompt();
      return;
    }
    setEmailData({
      newEmail: profile.email || ''
    });
    setEmailOpen(true);
  };

  const handleEmailClose = () => setEmailOpen(false)

  const handlePasswordOpen = () => {
    if (!token) {
      openLoginPrompt();
      return;
    }
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
    setPasswordOpen(true);
  };

  const handlePasswordClose = () => setPasswordOpen(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile(formData, {
      onSuccess: () => {
        handleClose()
      }
    })
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    updateEmail(emailData, {
      onSuccess: () => {
        handleEmailClose()
      }
    })
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    changePassword(passwordData, {
      onSuccess: () => {
        handlePasswordClose()
      }
    })
  }

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
          {t('Personal Information')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleEmailOpen}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            {t('Update Email')}
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handlePasswordOpen}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            {t('Change Password')}
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleOpen}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            {t('Update Profile')}
          </Button>
        </Box>
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

      <Modal open={emailOpen} onClose={handleEmailClose} disableScrollLock={true}>
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
              {t('Update Email')}
            </Typography>
            <IconButton onClick={handleEmailClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box component="form" onSubmit={handleEmailSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label={t('New Email Address')}
              value={emailData.newEmail}
              onChange={(e) => setEmailData({ ...emailData, newEmail: e.target.value })}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={emailPending}
              sx={{ mt: 1, textTransform: 'none', borderRadius: 2 }}
            >
              {emailPending ? <CircularProgress size={24} color="inherit" /> : t('Save Changes')}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={passwordOpen} onClose={handlePasswordClose} disableScrollLock={true}>
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
              {t('Change Password')}
            </Typography>
            <IconButton onClick={handlePasswordClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box component="form" onSubmit={handlePasswordSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label={t('Current Password')}
              type={showCurrent ? 'text' : 'password'}
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowCurrent(!showCurrent)} edge="end">
                      {showCurrent ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              label={t('New Password')}
              type={showNew ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowNew(!showNew)} edge="end">
                      {showNew ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              label={t('Confirm New Password')}
              type={showConfirm ? 'text' : 'password'}
              value={passwordData.confirmNewPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                      {showConfirm ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={passwordPending}
              sx={{ mt: 1, textTransform: 'none', borderRadius: 2 }}
            >
              {passwordPending ? <CircularProgress size={24} color="inherit" /> : t('Change Password')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  )
}
/* بما انه اشتغلت وحدة على المودل معناها كلهم عليها و احلى هيك*/ 