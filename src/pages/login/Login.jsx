import { Box, Button, CircularProgress, TextField, Typography, InputAdornment, Checkbox, FormControlLabel, useTheme, Paper, Container, Stack, Avatar, IconButton } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from '../../validations/LoginSchema'
import useAuthStore from '../../store/useAuthStore'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useTranslation } from 'react-i18next'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const theme = useTheme()
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const setToken = useAuthStore((state) => state.setToken)

  const { register, handleSubmit, watch, formState: { errors, isSubmitting, isValid } } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange'
  })

  const emailValue = watch("Email")

  const handleForgotPasswordClick = () => {
    if (emailValue) {
      localStorage.setItem("resetPasswordEmail", emailValue)
    }
  }

  const LoginForm = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Login`, data)
      setToken(response.data.accessToken)
      toast.success(t("Logged in successfully!"))
      navigate('/')
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid email or password."
      toast.error(t(errorMessage))
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
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
              <AutoAwesomeIcon fontSize="medium" />
            </Avatar>

            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary', textAlign: 'center' }}>
              {t('Welcome Back')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3.5, textAlign: 'center' }}>
              {t('Welcome back. Please enter your details.')}
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(LoginForm)}
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5
              }}
            >
              <TextField
                fullWidth
                {...register("Email")}
                label={t('Email Address')}
                variant="outlined"
                placeholder="name@example.com"
                error={!!errors.Email}
                helperText={errors.Email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <TextField
                  fullWidth
                  {...register("Password")}
                  label={t('Password')}
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  placeholder="********"
                  error={!!errors.Password}
                  helperText={errors.Password?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
                  <Link
                    to="/resetPassword"
                    onClick={handleForgotPasswordClick}
                    style={{ fontSize: '0.875rem', fontWeight: 500, color: theme.palette.primary.main, textDecoration: 'none' }}
                  >
                    {t('Forgot Password?')}
                  </Link>
                </Box>
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      color: 'text.secondary',
                      '&.Mui-checked': { color: 'primary.main' }
                    }}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    {t('Remember me for 30 days')}
                  </Typography>
                }
                sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
              />

              <Button
                variant="contained"
                fullWidth
                type="submit"
                size="large"
                disabled={isSubmitting || !isValid}
                sx={{
                  py: 1.6,
                  mt: 0.5,
                  borderRadius: 2.5,
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: isValid ? `0 8px 20px ${theme.palette.primary.main}40` : 'none',
                  '&:hover': {
                    boxShadow: isValid ? `0 12px 24px ${theme.palette.primary.main}50` : 'none'
                  }
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t('Sign In')
                )}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {t("Don't have an account?")}{' '}
                  <Link to="/register" style={{ color: theme.palette.primary.main, fontWeight: 600, textDecoration: 'none' }}>
                    {t('Create an account')}
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.8 ,display:'flex',alignItems:'center',justifyContent:'center' }}>
            &copy; {new Date().getFullYear()} Lumina Luxe. {t('All rights reserved.')}
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}