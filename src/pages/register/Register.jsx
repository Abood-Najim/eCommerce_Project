import { Box, Button, CircularProgress, TextField, Typography, InputAdornment, Checkbox, FormControlLabel, useTheme, Paper, Container, Stack, Avatar, Fade, Zoom, Slide } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from '../../validations/RegisterSchema'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import { useTranslation } from 'react-i18next'

export default function Register() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigate = useNavigate()
  const [agree, setAgree] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange'
  })

  const RigisterForm = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Register`, data)
      toast.success(t('Account created successfully!'))
      navigate('/login')
    } catch (err) {
      const serverErrors = err.response?.data?.errors || err.response?.data?.message
      
      if (Array.isArray(serverErrors)) {
        serverErrors.forEach((errMsg) => toast.error(t(errMsg)))
      } else if (serverErrors) {
        toast.error(t(serverErrors))
      } else {
        toast.error(t('Registration failed. Please try again.'))
      }
    }
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.mode === 'dark'
          ? `radial-gradient(circle at 50% 30%, ${theme.palette.primary.main}18 0%, ${theme.palette.background.default} 75%)`
          : `radial-gradient(circle at 50% 30%, ${theme.palette.primary.main}0D 0%, ${theme.palette.background.default} 75%)`,
        py: 6,
        px: 2
      }}
    >
      <Container maxWidth="xs">
        <Stack spacing={3} alignItems="center">
          <Slide direction="up" in timeout={600}>
            <Paper
              elevation={0}
              sx={{
                width: '100%',
                p: { xs: 3.5, sm: 4.5 },
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'background.paper',
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.palette.mode === 'dark'
                  ? '0px 20px 50px rgba(0, 0, 0, 0.4)'
                  : '0px 20px 50px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Zoom in timeout={800}>
                <Avatar
                  sx={{
                    mb: 2,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    width: 52,
                    height: 52,
                    boxShadow: `0 8px 16px ${theme.palette.primary.main}33`
                  }}
                >
                  <PersonAddOutlinedIcon fontSize="medium" />
                </Avatar>
              </Zoom>

              <Fade in timeout={1000}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary', textAlign: 'center' }}>
                    {t('Create your account')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3.5, textAlign: 'center' }}>
                    {t('Elevate your lifestyle with curated elegance.')}
                  </Typography>
                </Box>
              </Fade>

              <Box
                component="form"
                onSubmit={handleSubmit(RigisterForm)}
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2.5
                }}
              >
                <Fade in timeout={1200}>
                  <TextField
                    fullWidth
                    {...register("UserName")}
                    label={t('UserName')}
                    variant="outlined"
                    error={!!errors.UserName}
                    helperText={errors.UserName ? t(errors.UserName.message) : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlinedIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Fade>

                <Fade in timeout={1400}>
                  <TextField
                    fullWidth
                    {...register("FullName")}
                    label={t('FullName')}
                    variant="outlined"
                    error={!!errors.FullName}
                    helperText={errors.FullName ? t(errors.FullName.message) : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlinedIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Fade>

                <Fade in timeout={1600}>
                  <TextField
                    fullWidth
                    {...register("PhoneNumber")}
                    label={t('PhoneNumber')}
                    variant="outlined"
                    error={!!errors.PhoneNumber}
                    helperText={errors.PhoneNumber ? t(errors.PhoneNumber.message) : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneOutlinedIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Fade>

                <Fade in timeout={1800}>
                  <TextField
                    fullWidth
                    {...register("Email")}
                    label={t('Email')}
                    variant="outlined"
                    error={!!errors.Email}
                    helperText={errors.Email ? t(errors.Email.message) : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Fade>

                <Fade in timeout={2000}>
                  <TextField
                    fullWidth
                    {...register("Password")}
                    label={t('Password')}
                    type="password"
                    variant="outlined"
                    error={!!errors.Password}
                    helperText={errors.Password ? t(errors.Password.message) : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Fade>

                <Fade in timeout={2200}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        sx={{
                          color: 'text.secondary',
                          '&.Mui-checked': { color: 'primary.main' }
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" color="text.secondary">
                        {t('I agree to the')}{' '}
                        <Typography component="span" variant="body2" sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 500 }}>
                          {t('Terms of Service')}
                        </Typography>{' '}
                        {t('and')}{' '}
                        <Typography component="span" variant="body2" sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 500 }}>
                          {t('Privacy Policy')}
                        </Typography>
                        .
                      </Typography>
                    }
                    sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mt: 0.5 }}
                  />
                </Fade>

                <Fade in timeout={2400}>
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    size="large"
                    disabled={isSubmitting || !agree || !isValid}
                    sx={{
                      py: 1.6,
                      mt: 0.5,
                      borderRadius: 2.5,
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      boxShadow: isValid && agree ? `0 8px 20px ${theme.palette.primary.main}40` : 'none',
                      '&:hover': {
                        boxShadow: isValid && agree ? `0 12px 24px ${theme.palette.primary.main}50` : 'none'
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>{t('Register')}</span>
                        <ArrowForwardIcon fontSize="small" />
                      </Box>
                    )}
                  </Button>
                </Fade>

                <Fade in timeout={2600}>
                  <Box sx={{ textAlign: 'center', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {t('Already have an account?')}{' '}
                      <Link to="/login" style={{ color: theme.palette.primary.main, fontWeight: 600, textDecoration: 'none' }}>
                        {t('Login here')}
                      </Link>
                    </Typography>
                  </Box>
                </Fade>
              </Box>
            </Paper>
          </Slide>

          <Fade in timeout={2800}>
            <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.8 ,display:'flex',alignItems:'center',justifyContent:'center' }}>
              &copy; 2024 Lumina Luxe. {t('All rights reserved.')}
            </Typography>
          </Fade>
        </Stack>
      </Container>
    </Box>
  )
}