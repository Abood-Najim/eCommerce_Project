import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Button,
  Typography,
  useTheme,
  CircularProgress,
  Paper,
  Container,
  Avatar,
  Stack,
  Fade,
  Zoom,
  Slide
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import useSendCode from '../../hooks/useSendCode'

export default function VerifyCode() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const theme = useTheme()

  const [code, setCode] = useState(['', '', '', ''])
  const inputRefs = useRef([])

  const savedEmail = localStorage.getItem('resetPasswordEmail')
  const { mutate: sendCode, isPending: isSending } = useSendCode()

  useEffect(() => {
    if (!savedEmail) {
      toast.error(t('Please request a password reset code first.'))
      navigate('/resetPassword')
    }
  }, [savedEmail, navigate, t])

  const handleChange = (index, value) => {
    if (isNaN(value)) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').trim()
    if (/^\d{4}$/.test(pasteData)) {
      const newCode = pasteData.split('')
      setCode(newCode)
      inputRefs.current[3]?.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const fullCode = code.join('')
    if (fullCode.length !== 4) {
      toast.error(t('Please enter the complete 4-digit code.'))
      return
    }

    localStorage.setItem('resetPasswordCode', fullCode)
    toast.success(t('Code verified successfully!'))
    navigate('/setNewPass')
  }

  const handleResend = () => {
    if (!savedEmail) {
      toast.error(t('No email found. Please go back to the reset page.'))
      return
    }

    sendCode(
      { email: savedEmail },
      {
        onSuccess: () => {
          toast.success(t('Security code resent to your email!'))
          setCode(['', '', '', ''])
          inputRefs.current[0]?.focus()
        },
        onError: (err) => {
          const rawMessage = err?.response?.data?.message || err?.message
          toast.error(rawMessage ? t(rawMessage) : t('Failed to resend code. Please try again.'))
        }
      }
    )
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
        <Stack spacing={3} alignItems="center" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
                justifyContent: 'center',
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
                  <LockOutlinedIcon fontSize="medium" />
                </Avatar>
              </Zoom>

              <Fade in timeout={1000}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: 'text.primary', mb: 1, textAlign: 'center' }}
                  >
                    {t('Verify Reset Code')}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: 'center', mb: 3.5, lineHeight: 1.5 }}
                  >
                    {t('Enter the 4-digit security code sent to')}
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ fontWeight: 600, color: 'text.primary', display: 'block', mt: 0.5 }}
                    >
                      {savedEmail}
                    </Typography>
                  </Typography>
                </Box>
              </Fade>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <Fade in timeout={1200}>
                  <Box sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el
                        }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        style={{
                          width: 56,
                          height: 64,
                          textAlign: 'center',
                          fontSize: '24px',
                          fontWeight: 700,
                          border: `2px solid ${digit ? theme.palette.primary.main : theme.palette.divider}`,
                          borderRadius: '12px',
                          outline: 'none',
                          backgroundColor: digit ? `${theme.palette.primary.main}08` : theme.palette.background.default,
                          color: theme.palette.text.primary,
                          transition: 'all 0.2s ease-in-out'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = theme.palette.primary.main
                          e.target.style.boxShadow = `0 0 0 4px ${theme.palette.primary.main}20`
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = digit ? theme.palette.primary.main : theme.palette.divider
                          e.target.style.boxShadow = 'none'
                        }}
                      />
                    ))}
                  </Box>
                </Fade>

                <Fade in timeout={1400}>
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    size="large"
                    disabled={isSending || code.join('').length !== 4}
                    sx={{
                      py: 1.6,
                      borderRadius: 2.5,
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      boxShadow: `0 8px 20px ${theme.palette.primary.main}40`,
                      '&:hover': {
                        boxShadow: `0 12px 24px ${theme.palette.primary.main}50`
                      }
                    }}
                  >
                    {isSending ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>{t('Verify Code')}</span>
                        <CheckCircleOutlineOutlinedIcon fontSize="small" />
                      </Box>
                    )}
                  </Button>
                </Fade>

                <Fade in timeout={1600}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 2.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      {t("Didn't receive code?")}
                    </Typography>
                    <Button
                      onClick={handleResend}
                      disabled={isSending}
                      variant="text"
                      size="small"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        textTransform: 'none',
                        p: 0,
                        minWidth: 'auto',
                        '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                      }}
                    >
                      {t('Resend')}
                    </Button>
                  </Box>
                </Fade>

                <Fade in timeout={1800}>
                  <Button
                    component={Link}
                    to="/login"
                    startIcon={<ArrowBackIcon fontSize="small" />}
                    sx={{
                      mt: 2,
                      color: 'text.secondary',
                      textTransform: 'none',
                      fontWeight: 500,
                      borderRadius: 2,
                      '&:hover': { color: 'text.primary', backgroundColor: 'action.hover' }
                    }}
                  >
                    {t('Back to Login')}
                  </Button>
                </Fade>
              </Box>
            </Paper>
          </Slide>

          <Fade in timeout={2000}>
            <Stack spacing={1} alignItems="center">
              <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.8 }}>
                {t('Protected by Lumina Security • High-grade encryption')}
              </Typography>
              <Stack direction="row" spacing={2} color="text.disabled" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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