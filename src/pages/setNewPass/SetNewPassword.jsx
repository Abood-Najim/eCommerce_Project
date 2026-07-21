import { yupResolver } from "@hookform/resolvers/yup"
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  InputAdornment,
  useTheme,
  IconButton,
} from "@mui/material"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate, Link } from "react-router-dom"
import { setNewPasswordSchema } from "../../validations/SetNewPasswordSchema"
import useResetPassword from "../../hooks/useResetPassword"
import LockResetIcon from '@mui/icons-material/LockReset'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export default function SetNewPassword() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const theme = useTheme()
  const [serverErrors, setServerErrors] = useState([])

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const savedEmail = localStorage.getItem('resetPasswordEmail') || ''
  const savedCode = localStorage.getItem('resetPasswordCode') || ''

  const { mutate: resetPassword, isPending } = useResetPassword()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(setNewPasswordSchema),
    mode: "onBlur",
  })

  const onSubmit = (data) => {
    if (!savedEmail || !savedCode) {
      setServerErrors(["Missing email or code. Please go back and restart the reset process."])
      return
    }

    resetPassword(
      {
        email: savedEmail,
        code: savedCode,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          localStorage.removeItem('resetPasswordEmail')
          localStorage.removeItem('resetPasswordCode')
          navigate("/login")
        },
        onError: (err) => {
          setServerErrors([err.response?.data?.message || err.message || "An error occurred."])
        },
      }
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        py: 42,
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
          {t("Set New Password")}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 1, maxWidth: '90%' }}>
          {t("Enter your new password.")}
        </Typography>

        {serverErrors?.length > 0 && serverErrors.map((error, index) => (
          <Typography key={index} color='error' variant="body2" sx={{ width: '100%', textAlign: 'center' }}>{error}</Typography>
        ))}

        <TextField
          fullWidth
          disabled
          label={t("Email Address")}
          variant="outlined"
          value={savedEmail}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ 
            '& .MuiInputBase-root.Mui-disabled': {
              backgroundColor: 'action.disabledBackground',
              color: 'text.disabled'
            }
          }}
        />
        <Box sx={{ position: 'relative', width: '100%' }}>
          <TextField
            fullWidth
            {...register("newPassword")}
            label={t("New Password")}
            type={showNewPassword ? "text" : "password"}
            variant="outlined"
            placeholder="********"
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: null,
            }}
          />
          <IconButton
            onClick={() => setShowNewPassword((prev) => !prev)}
            sx={{
              position: 'absolute',
              right: 10,
              top: 12,
              color: 'text.secondary',
            }}
          >
            {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Box>

        <Box sx={{ position: 'relative', width: '100%' }}>
          <TextField
            fullWidth
            {...register("confirmPassword")}
            label={t("Confirm Password")}
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            placeholder="********"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: null,
            }}
          />
          <IconButton
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            sx={{
              position: 'absolute',
              right: 10,
              top: 12,
              color: 'text.secondary',
            }}
          >
            {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Box>

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
            <>
              {t("Reset Password")}
              <CheckCircleOutlineOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
            </>
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