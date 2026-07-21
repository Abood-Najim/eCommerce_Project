import { Box, Button, CircularProgress, TextField, Typography, InputAdornment, Checkbox, FormControlLabel, Divider, useTheme } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from '../../validations/RegisterSchema'
import { Link, useNavigate } from 'react-router-dom'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default function Register() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [serverErrors, setServerErrors] = useState([])
  const [agree, setAgree] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(registerSchema)
  })

  const RigisterForm = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Register`, data)
      console.log(response)
      navigate('/login')
    } catch (err) {
      setServerErrors(err.response?.data?.errors || [])
    }
  }

  return (
    <Box sx={{textAlign : 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'background.default', py: 13,px: 2 }}>

      <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5, letterSpacing: '-0.5px' }}>
        Lumina Luxe
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Elevate your lifestyle with curated elegance.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(RigisterForm)}
        sx={{
          width: '100%',
          maxWidth: 500,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          p: 4,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
          Create your account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Join the community of luxury seekers.
        </Typography>

        {serverErrors?.length > 0 && serverErrors.map((error, index) => (
          <Typography key={index} color='error' variant="body2">{error}</Typography>
        ))}

        <TextField
          fullWidth
          {...register("UserName")}
          label="UserName"
          variant="outlined"
          error={!!errors.UserName}
          helperText={errors.UserName?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlinedIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          {...register("FullName")}
          label="FullName"
          variant="outlined"
          error={!!errors.FullName}
          helperText={errors.FullName?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlinedIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          {...register("PhoneNumber")}
          label="PhoneNumber"
          variant="outlined"
          error={!!errors.PhoneNumber}
          helperText={errors.PhoneNumber?.message}
        />

        <TextField
          fullWidth
          {...register("Email")}
          label="Email"
          variant="outlined"
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

        <TextField
          fullWidth
          {...register("Password")}
          label="Password"
          type="password"
          variant="outlined"
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
          control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />}
          label={
            <Typography variant="body2" color="text.secondary">
              I agree to the <span style={{ color: theme.palette.primary.main, cursor: 'pointer' }}>Terms of Service</span> and <span style={{ color: theme.palette.primary.main, cursor: 'pointer' }}>Privacy Policy</span>.
            </Typography>
          }
          sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mt: 1 }}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={isSubmitting || !agree}
          sx={{
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'center'
          }}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          {!isSubmitting && <ArrowForwardIcon fontSize="small" />}
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account? <Link to="/login" style={{ color: theme.palette.primary.main, fontWeight: 500, textDecoration: 'none' }}>Login here</Link>
          </Typography>
        </Box>

      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 4 }}>
        &copy; 2024 Lumina Luxe. All rights reserved.
      </Typography>
    </Box>
  )
}