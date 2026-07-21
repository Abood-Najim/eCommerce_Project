import { yupResolver } from "@hookform/resolvers/yup"
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  InputAdornment,
  useTheme,
} from "@mui/material"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate, Link } from "react-router-dom"
import ResetPasswordSchema  from "../../validations/ResetPasswordSchema"
import useSendCode from "../../hooks/useSendCode"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LockResetIcon from '@mui/icons-material/LockReset'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'

export default function ResetPassword() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const theme = useTheme()
  const [serverErrors, setServerErrors] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    mode: "onBlur",
  })

  const { mutate: sendCode, isPending } = useSendCode()

    const onSubmit = (data) => {
    sendCode(data, {
      onSuccess: () => {
        localStorage.setItem('resetPasswordEmail', data.email); 
        navigate("/verifyCode")
      },
      onError: (error) => {
        setServerErrors([error.message || "An error occurred."])
      },
    })
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          maxWidth: 450,
          backgroundColor: "background.paper",
          borderRadius: 3,
          p: 4,
          boxShadow: '0px 10px 40px rgba(0,0,0,0.08)',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ 
          width: 56, 
          height: 56, 
          borderRadius: '50%', 
          border: 2,
          borderColor: 'primary.main',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mb: 1
        }}>
          <LockResetIcon sx={{ color: 'primary.main', fontSize: 28 }} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {t("Reset Password")}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 1, maxWidth: '90%' }}>
          {t("Enter your email address and we'll send you a verification code.")}
        </Typography>

        {serverErrors?.length > 0 && serverErrors.map((error, index) => (
          <Typography key={index} color='error' variant="body2" sx={{ width: '100%', textAlign: 'center' }}>{error}</Typography>
        ))}

        <TextField
          fullWidth
          {...register("email")}
          label={t("Email Address")}
          variant="outlined"
          placeholder="name@domain.com"
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{ 
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={isPending || isSubmitting}
          sx={{
            py: 1.5,
            mt: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: 'none',
          }}
        >
          {isPending || isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t("Send Verification Code")
          )}
        </Button>

        <Link 
          to="/login" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            color: theme.palette.text.secondary, 
            textDecoration: 'none',
            fontWeight: 500,
            marginTop: '8px'
          }}
        >
          <ArrowBackIcon fontSize="small" />
          {t("Back to Login")}
        </Link>

      </Box>

      <Box sx={{ display: 'flex', gap: 3, mt: 6 }}>
        <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
          {t("Privacy Policy")}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
          {t("Terms of Service")}
        </Typography>
      </Box>
      
      <Typography variant="caption" color="text.secondary" sx={{ mt: 3 }}>
        &copy; 2024 Lumina Luxe. {t("All rights reserved.")}
      </Typography>
    </Box>
  )
}