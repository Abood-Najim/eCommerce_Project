import { Box, Button, CircularProgress, TextField, Typography, InputAdornment, Checkbox, FormControlLabel, useTheme } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from '../../validations/LoginSchema'
import useAuthStore from '../../store/useAuthStore'
import { useNavigate, Link } from 'react-router-dom'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { useTranslation } from 'react-i18next'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const theme = useTheme()
  const [serverErrors, setServerErrors] = useState([])
  const [rememberMe, setRememberMe] = useState(false)
  const setToken = useAuthStore((state) => state.setToken)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const LoginForm = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Login`, data)
      setToken(response.data.accessToken)
      navigate('/')
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid email or password.";
      setServerErrors([errorMessage]);
    }
  }

  return (
    <Box sx={{ 
      textAlign:'center',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: 'background.default', 
      py: 28, 
      px: 2
    }}>
      
      <Box 
        component="form" 
        onSubmit={handleSubmit(LoginForm)} 
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
          gap: 2
        }}
      >
        <Box sx={{ 
          width: 56, 
          height: 56, 
          borderRadius: 2, 
          backgroundColor: 'primary.main', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mb: 1
        }}>
          <AutoAwesomeIcon sx={{ color: 'white', fontSize: 28 }} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: '-0.5px' }}>
          Lumina Luxe
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t('Welcome back. Please enter your details.')}
        </Typography>

        {serverErrors?.length > 0 && serverErrors.map((error, index) => (
          <Typography key={index} color='error' variant="body2" sx={{ width: '100%', textAlign: 'center' }}>{error}</Typography>
        ))}

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

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
            {t('Password')}
          </Typography>
          <Link to='/resetPassword' 
            style={{ fontWeight: 500, color: theme.palette.primary.main, textDecoration: 'none' }} >
            {t('Forgot Password?')}
          </Link>
        </Box>

        <TextField
          fullWidth
          {...register("Password")}
          type="password"
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
          }}
        />

        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
          label={
            <Typography variant="body2" color="text.secondary">
              {t('Remember me for 30 days')}
            </Typography>
          }
          sx={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', mt: 1 }}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={isSubmitting}
          sx={{ 
            py: 1.5, 
            mt: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isSubmitting ? <CircularProgress color="inherit" /> : t('Sign In')}
        </Button>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {t("Don't have an account?")} <Link to="/register" style={{ color: theme.palette.primary.main, fontWeight: 600, textDecoration: 'none' }}>{t('Create an account')}</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}