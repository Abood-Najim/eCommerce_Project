import { Box, Button, Typography, useTheme, CircularProgress } from '@mui/material'
import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import LockIcon from '@mui/icons-material/Lock'
import ShieldIcon from '@mui/icons-material/Shield'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import useSendCode from '../../hooks/useSendCode'

export default function VerifyCode() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const theme = useTheme()
  
  const [code, setCode] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  
  const inputRefs = useRef([])

  const savedEmail = localStorage.getItem('resetPasswordEmail') || ''
  const { mutate: sendCode, isPending: isSending } = useSendCode()

  const handleChange = (index, value) => {
    if (isNaN(value)) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 3) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const fullCode = code.join('')
    if (fullCode.length !== 4) {
      setError('Please enter the complete 4-digit code.')
      return
    }

    localStorage.setItem('resetPasswordCode', fullCode)
    navigate('/setNewPass')
  }

  const handleResend = () => {
    if (!savedEmail) {
      setError('No email found. Please go back to the reset page.')
      return
    }
    
    sendCode({ email: savedEmail }, {
      onSuccess: () => {
        setError('')
        setCode(['', '', '', ''])
        inputRefs.current[0]?.focus()
      },
      onError: (err) => {
        setError(err.message || 'Failed to resend code. Please try again.')
      }
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        py: 50,
        px: 2
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 4, letterSpacing: '-0.5px' }}>
        Lumina Luxe
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 450,
          backgroundColor: 'background.paper',
          borderRadius: 3,
          p: 4,
          boxShadow: '0px 10px 40px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {t('Verify Reset Code')}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 1 }}>
          {t('Enter the 4-digit security code we sent to your registered email.')}
        </Typography>

        {error && (
          <Typography color='error' variant="body2" sx={{ width: '100%', textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              style={{
                width: 60,
                height: 70,
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: 600,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '8px',
                outline: 'none',
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = theme.palette.primary.main
                e.target.style.boxShadow = `0 0 0 2px ${theme.palette.primary.main}33`
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme.palette.divider
                e.target.style.boxShadow = 'none'
              }}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={isSending || code.join('').length !== 4}
          sx={{
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'center',
            textTransform: 'none',
          }}
        >
          {isSending ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <>
              {t('Verify Code')}
              <CheckCircleOutlineOutlinedIcon fontSize="small" />
            </>
          )}
        </Button>

        <Button 
          onClick={handleResend}
          disabled={isSending}
          variant="text"
          sx={{ 
            fontWeight: 500, 
            color: 'primary.main', 
            cursor: 'pointer', 
            textTransform: 'none',
            '&:hover': { textDecoration: 'underline', backgroundColor: 'transparent' }
          }}
        >
          {isSending ? <CircularProgress size={20} color="primary" /> : t('Resend Code')}
        </Button>

        <Button 
          component={Link} 
          to="/login"
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            color: 'text.secondary', 
            textDecoration: 'none',
            fontWeight: 500,
            marginTop: '4px',
            textTransform: 'none'
          }}
        >
          <ArrowBackIcon fontSize="small" />
          {t('Back to Login')}
        </Button>
      </Box>

      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
          {t('Protected by Lumina Security • High-grade encryption')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ShieldIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          <LockIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          <VerifiedUserIcon fontSize="small" sx={{ color: 'text.secondary' }} />
        </Box>
      </Box>
    </Box>
  )
}