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
  Paper,
  Container,
  Stack,
  Avatar,
  Fade,
  Zoom,
  Slide
} from "@mui/material"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
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
      toast.error(t("Missing email or code. Please go back and restart the reset process."))
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
          toast.success(t("Password changed successfully!"))
          navigate("/login")
        },
        onError: (err) => {
          const rawMessage = err?.response?.data?.message || err?.message
          toast.error(rawMessage ? t(rawMessage) : t("Failed to reset password. Please try again."))
        },
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
        <Stack spacing={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                  <LockResetIcon fontSize="medium" />
                </Avatar>
              </Zoom>

              <Fade in timeout={1000}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 1, textAlign: 'center' }}>
                    {t("Set New Password")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3, lineHeight: 1.5 }}>
                    {t("Please enter your new password below.")}
                  </Typography>
                </Box>
              </Fade>

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2.5,
                }}
              >
                <Fade in timeout={1200}>
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
                        backgroundColor: 'action.hover',
                        color: 'text.secondary'
                      }
                    }}
                  />
                </Fade>

                <Fade in timeout={1400}>
                  <TextField
                    fullWidth
                    {...register("newPassword")}
                    label={t("New Password")}
                    type={showNewPassword ? "text" : "password"}
                    variant="outlined"
                    placeholder="••••••••"
                    error={!!errors.newPassword}
                    helperText={errors.newPassword ? t(errors.newPassword.message) : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            edge="end"
                            tabIndex={-1}
                          >
                            {showNewPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Fade>

                <Fade in timeout={1600}>
                  <TextField
                    fullWidth
                    {...register("confirmPassword")}
                    label={t("Confirm Password")}
                    type={showConfirmPassword ? "text" : "password"}
                    variant="outlined"
                    placeholder="••••••••"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword ? t(errors.confirmPassword.message) : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            edge="end"
                            tabIndex={-1}
                          >
                            {showConfirmPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Fade>

                <Fade in timeout={1800}>
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    size="large"
                    disabled={isPending || isSubmitting}
                    sx={{
                      py: 1.6,
                      mt: 0.5,
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
                    {isPending || isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>{t("Reset Password")}</span>
                        <CheckCircleOutlineOutlinedIcon fontSize="small" />
                      </Box>
                    )}
                  </Button>
                </Fade>

                <Fade in timeout={2000}>
                  <Button
                    component={Link}
                    to="/login"
                    startIcon={<ArrowBackIcon fontSize="small" />}
                    sx={{
                      mt: 1,
                      color: 'text.secondary',
                      textTransform: 'none',
                      fontWeight: 500,
                      borderRadius: 2,
                      '&:hover': { color: 'text.primary', backgroundColor: 'action.hover' }
                    }}
                  >
                    {t("Back to Login")}
                  </Button>
                </Fade>
              </Box>
            </Paper>
          </Slide>

          <Fade in timeout={2200}>
            <Stack spacing={1.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Stack direction="row" spacing={3}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                >
                  {t("Privacy Policy")}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                >
                  {t("Terms of Service")}
                </Typography>
              </Stack>

              <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.8 }}>
                &copy; 2024 Lumina Luxe. {t("All rights reserved.")}
              </Typography>
            </Stack>
          </Fade>
        </Stack>
      </Container>
    </Box>
  )
}