import React, { useState } from 'react'
import {
  Box, Paper, Typography, CircularProgress, Button, useTheme, Modal,
  TextField, IconButton, Divider, InputAdornment, Grid, Card, Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
  Fade, Zoom, Slide, Grow
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import useProfile from '../../hooks/useProfile'
import useUpdateProfile from '../../hooks/useUpdateProfile'
import useUpdateEmail from '../../hooks/useUpdateEmail'
import useChangePassword from '../../hooks/useChangePassword'
import useAuthStore from '../../store/useAuthStore'
import useLoginPromptStore from '../../store/useLoginPromptStore'
import CloseIcon from '@mui/icons-material/Close'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default function ProfileInfo() {
  const { t } = useTranslation()
  const theme = useTheme()
  const token = useAuthStore((state) => state.token)
  const openLoginPrompt = useLoginPromptStore((state) => state.openLoginPrompt)
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

  if (isLoading) {
    return (
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Paper>
    )
  }

  if (isError) {
    return (
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
        <Typography color="error" align="center">{error?.message ? t(error.message) : t('An error occurred')}</Typography>
      </Paper>
    )
  }

  const profile = data?.response || data || {}
  const orders = profile.orders || []

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .slice(0, 5)

  const handleOpen = () => {
    if (!token) {
      openLoginPrompt()
      return
    }
    setFormData({
      fullName: profile.fullName || '',
      phoneNumber: profile.phoneNumber || ''
    })
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleEmailOpen = () => {
    if (!token) {
      openLoginPrompt()
      return
    }
    setEmailData({
      newEmail: profile.email || ''
    })
    setEmailOpen(true)
  }

  const handleEmailClose = () => setEmailOpen(false)

  const handlePasswordOpen = () => {
    if (!token) {
      openLoginPrompt()
      return
    }
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    })
    setPasswordOpen(true)
  }

  const handlePasswordClose = () => setPasswordOpen(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile(formData, {
      onSuccess: () => {
        toast.success(t('Profile updated successfully!'))
        handleClose()
      },
      onError: (err) => {
        const rawMessage = err?.response?.data?.message || err?.message
        toast.error(rawMessage ? t(rawMessage) : t('Failed to update profile.'))
      }
    })
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    updateEmail(emailData, {
      onSuccess: () => {
        toast.success(t('Email updated successfully!'))
        handleEmailClose()
      },
      onError: (err) => {
        const rawMessage = err?.response?.data?.message || err?.message
        toast.error(rawMessage ? t(rawMessage) : t('Failed to update email.'))
      }
    })
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error(t('Passwords do not match'))
      return
    }

    changePassword(passwordData, {
      onSuccess: () => {
        toast.success(t('Password changed successfully!'))
        handlePasswordClose()
      },
      onError: (err) => {
        const rawMessage = err?.response?.data?.message || err?.message
        toast.error(rawMessage ? t(rawMessage) : t('Failed to change password.'))
      }
    })
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '92%', sm: 440 },
    bgcolor: 'background.paper',
    borderRadius: 3,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.palette.mode === 'dark' ? '0px 20px 50px rgba(0, 0, 0, 0.5)' : '0px 20px 50px rgba(0, 0, 0, 0.08)',
    p: { xs: 3, sm: 4 }
  }

  return (
    <Fade in timeout={600}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: 'background.paper',
          boxShadow: theme.palette.mode === 'dark' ? '0px 10px 30px rgba(0,0,0,0.3)' : '0px 10px 30px rgba(0,0,0,0.03)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {t('Personal Information')}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleEmailOpen}
              startIcon={<EmailOutlinedIcon />}
              sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}
            >
              {t('Update Email')}
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handlePasswordOpen}
              startIcon={<LockOutlinedIcon />}
              sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}
            >
              {t('Change Password')}
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleOpen}
              startIcon={<EditOutlinedIcon />}
              sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}
            >
              {t('Update Profile')}
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <Grow in timeout={600}>
              <Card elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: theme.palette.mode === 'dark' ? 'action.hover' : 'grey.50', border: `1px solid ${theme.palette.divider}` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <PersonOutlinedIcon color="primary" fontSize="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>{t('Full Name')}</Typography>
                </Box>
                <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '1.05rem', pl: 3.5 }}>
                  {profile.fullName || '—'}
                </Typography>
              </Card>
            </Grow>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grow in timeout={800}>
              <Card elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: theme.palette.mode === 'dark' ? 'action.hover' : 'grey.50', border: `1px solid ${theme.palette.divider}` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <EmailOutlinedIcon color="primary" fontSize="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>{t('Email Address')}</Typography>
                </Box>
                <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '1.05rem', pl: 3.5 }}>
                  {profile.email || '—'}
                </Typography>
              </Card>
            </Grow>
          </Grid>

          <Grid item xs={12}>
            <Grow in timeout={1000}>
              <Card elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: theme.palette.mode === 'dark' ? 'action.hover' : 'grey.50', border: `1px solid ${theme.palette.divider}` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <PhoneOutlinedIcon color="primary" fontSize="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>{t('Phone Number')}</Typography>
                </Box>
                <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '1.05rem', pl: 3.5 }}>
                  {profile.phoneNumber || '—'}
                </Typography>
              </Card>
            </Grow>
          </Grid>
        </Grid>

        {/* Recent Orders Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {t('Recent Orders')}
          </Typography>
          {orders.length > 0 && (
            <Button
              component={Link}
              to="/profile/orders"
              endIcon={<ArrowForwardIcon />}
              size="small"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              {t('View All')}
            </Button>
          )}
        </Box>

        {recentOrders.length === 0 ? (
          <Fade in timeout={800}>
            <Card
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                bgcolor: theme.palette.mode === 'dark' ? 'action.hover' : 'grey.50',
                border: `1px solid ${theme.palette.divider}`,
                textAlign: 'center'
              }}
            >
              <ShoppingBagOutlinedIcon sx={{ fontSize: 40, color: 'text.secondary', opacity: 0.4, mb: 1 }} />
              <Typography color="text.secondary" variant="body2">
                {t('No recent orders to show.')}
              </Typography>
            </Card>
          </Fade>
        ) : (
          <Fade in timeout={600}>
            <TableContainer sx={{ borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'action.hover' : 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.5 }}>{t('Order ID')}</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 1.5 }}>{t('Date')}</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 1.5 }}>{t('Amount')}</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 1.5 }}>{t('Status')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map((order, index) => (
                    <Fade in timeout={400 + index * 100} key={order.id}>
                      <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell sx={{ py: 1.5 }}>#{order.id}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          {new Date(order.orderDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell sx={{ py: 1.5, fontWeight: 600, color: 'primary.main' }}>
                          ${order.amountPaid}
                        </TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          <Chip
                            label={order.status || '—'}
                            size="small"
                            color={order.status === 'Active' ? 'success' : 'default'}
                            sx={{ fontWeight: 500, fontSize: '0.75rem' }}
                          />
                        </TableCell>
                      </TableRow>
                    </Fade>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Fade>
        )}

        <Modal open={open} onClose={handleClose} disableScrollLock={true}>
          <Fade in={open} timeout={300}>
            <Box sx={modalStyle}>
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
          </Fade>
        </Modal>

        <Modal open={emailOpen} onClose={handleEmailClose} disableScrollLock={true}>
          <Fade in={emailOpen} timeout={300}>
            <Box sx={modalStyle}>
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
          </Fade>
        </Modal>

        <Modal open={passwordOpen} onClose={handlePasswordClose} disableScrollLock={true}>
          <Fade in={passwordOpen} timeout={300}>
            <Box sx={modalStyle}>
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
          </Fade>
        </Modal>
      </Paper>
    </Fade>
  )
}