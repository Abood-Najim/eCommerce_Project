import React, { useEffect } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  InputAdornment,
  useTheme,
  Paper,
  Container,
  Avatar,
  Stack,
  Fade,
  Zoom,
  Slide
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import  resetPasswordSchema  from '../../validations/ResetPasswordSchema'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import useSendCode from '../../hooks/useSendCode'

export default function ResetPassword() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const theme = useTheme()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onChange'
  })

  useEffect(() => {
    const savedEmail = localStorage.getItem('resetPasswordEmail')
    if (savedEmail) {
      setValue('email', savedEmail, { shouldValidate: true })
    }
  }, [setValue])

  const { mutate: sendCode, isPending } = useSendCode()

  const onSubmit = (data) => {
    sendCode(data, {
      onSuccess: () => {
        localStorage.setItem('resetPasswordEmail', data.email)
        toast.success(t('Security code sent successfully!'))
        navigate('/verifyCode')
      },
      onError: (err) => {
        const rawMessage = err?.response?.data?.message || err?.message
        toast.error(rawMessage ? t(rawMessage) : t('Failed to send reset code. Please try again.'))
      }
    })
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `radial-gradient(circle at 50% 30%, ${theme.palette.primary.main}12 0%, ${theme.palette.background.default} 70%)`,
        py: 4,
        px: 2
      }}
    >
      <Container maxWidth="xs">
        <Stack spacing={3} sx={{alignItems:'center'}}>
          <Fade in timeout={500}>
            <Typography
              variant="h4"
              component={Link}
              to="/"
              sx={{
                fontWeight: 800,
                color: 'primary.main',
                textDecoration: 'none',
                letterSpacing: '-0.5px'
              }}
            >
              Lumina Luxe
            </Typography>
          </Fade>

          <Slide direction="up" in timeout={700}>
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
                boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Zoom in timeout={900}>
                <Avatar
                  sx={{
                    mb: 2.5,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    width: 54,
                    height: 54,
                    boxShadow: `0 8px 16px ${theme.palette.primary.main}33`
                  }}
                >
                  <LockResetOutlinedIcon fontSize="medium" />
                </Avatar>
              </Zoom>

              <Fade in timeout={1000}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 1, textAlign: 'center' }}>
                    {t('Reset Password')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3.5, lineHeight: 1.5 }}>
                    {t("Enter your email address and we'll send you a 4-digit security code to reset your password.")}
                  </Typography>
                </Box>
              </Fade>

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3
                }}
              >
                <Fade in timeout={1200}>
                  <TextField
                    fullWidth
                    {...register('email')}
                    label={t('Email Address')}
                    placeholder="name@example.com"
                    error={!!errors.email}
                    helperText={errors.email?.message ? t(errors.email.message) : ''}
                  />
                </Fade>

                <Fade in timeout={1400}>
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    size="large"
                    disabled={isPending || !isValid}
                    sx={{
                      py: 1.6,
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
                    {isPending ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:'center', gap: 1 }}>
                        <span>{t('Send Security Code')}</span>
                        <SendOutlinedIcon fontSize="small" />
                      </Box>
                    )}
                  </Button>
                </Fade>

                <Fade in timeout={1600}>
                  <Button
                    component={Link}
                    to="/login"
                    startIcon={<ArrowBackIcon fontSize="small" />}
                    sx={{
                      color: 'text.secondary',
                      textTransform: 'none',
                      fontWeight: 500,
                      borderRadius: 2,
                      alignSelf: 'center',
                      '&:hover': { color: 'text.primary', backgroundColor: 'action.hover' }
                    }}
                  >
                    {t('Back to Login')}
                  </Button>
                </Fade>
              </Box>
            </Paper>
          </Slide>

          <Fade in timeout={1800}>
            <Stack spacing={1} sx={{alignItems:'center'}}>
              <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.8 }}>
                {t('Protected by Lumina Security • High-grade encryption')}
              </Typography>
              <Stack direction="row" spacing={2} color="text.disabled">
                <ShieldOutlinedIcon fontSize="small" />
                <LockPersonOutlinedIcon fontSize="small" />
                <VerifiedUserOutlinedIcon fontSize="small" />
              </Stack>
            </Stack>
          </Fade>
        </Stack>
      </Container>
    </Box>
  )
}