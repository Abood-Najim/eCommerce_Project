import { yupResolver } from "@hookform/resolvers/yup"
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  InputAdornment,
  useTheme,
  alpha,
  Paper,
  Container,
} from "@mui/material"
import React from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import ResetPasswordSchema from "../../validations/ResetPasswordSchema"
import useSendCode from "../../hooks/useSendCode"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"

export default function ResetPassword() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const theme = useTheme()
  const isRTL = i18n.language === "ar"

  const savedEmail = localStorage.getItem("resetPasswordEmail") || ""

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      email: savedEmail,
    },
  })

  const { mutate: sendCode, isPending } = useSendCode()

  const onSubmit = (data) => {
    sendCode(data, {
      onSuccess: () => {
        localStorage.setItem("resetPasswordEmail", data.email)
        toast.success(t("Verification code sent successfully to your email!"))
        navigate("/verifyCode")
      },
      onError: (error) => {
        const rawMessage = error?.response?.data?.message || error.message
        toast.error(rawMessage ? t(rawMessage) : t("An error occurred."))
      },
    })
  }

  return (
    <Box
      sx={{
        minHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        py: { xs: 4, md: 8 },
        px: 2,
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "primary.main",
            mb: 3,
            letterSpacing: "-0.5px",
          }}
        >
          Lumina Luxe
        </Typography>

        <Paper
          elevation={0}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "100%",
            backgroundColor: "background.paper",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2.5,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 0.5,
            }}
          >
            <LockResetOutlinedIcon sx={{ color: "primary.main", fontSize: 28 }} />
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}>
              {t("Reset Password")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320, mx: "auto", lineHeight: 1.5 }}>
              {t("Enter your email address and we'll send you a verification code.")}
            </Typography>
          </Box>

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
                  <EmailOutlinedIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            type="submit"
            disableElevation
            disabled={isPending || isSubmitting}
            sx={{
              py: 1.5,
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            {isPending || isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("Send Verification Code")
            )}
          </Button>

          <Box sx={{ pt: 1 }}>
            <Link
              to="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: theme.palette.text.secondary,
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "0.9rem",
                transition: "color 0.2s ease",
              }}
            >
              <ArrowBackIcon
                fontSize="small"
                sx={{
                  transform: isRTL ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s ease",
                }}
              />
              {t("Back to Login")}
            </Link>
          </Box>
        </Paper>

        <Box sx={{ display: "flex", gap: 3, mt: 4 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              cursor: "pointer",
              fontWeight: 500,
              "&:hover": { color: "primary.main" },
            }}
          >
            {t("Privacy Policy")}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              cursor: "pointer",
              fontWeight: 500,
              "&:hover": { color: "primary.main" },
            }}
          >
            {t("Terms of Service")}
          </Typography>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
          &copy; {new Date().getFullYear()} Lumina Luxe. {t("All rights reserved.")}
        </Typography>
      </Container>
    </Box>
  )
}