import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from '../../validations/LoginSchema'

export default function Login() {

      const [serverErrors,setServerErrors] = useState([])

      const {register,handleSubmit,formState:{errors,isSubmitting}}  = useForm(
        {
          resolver:yupResolver(loginSchema)
        }
      );
      const RigisterForm = async (data)=>{
        try{
          const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Login`,data);
          console.log(response.data.accessToken);
          localStorage.setItem("accessToken",response.data.accessToken)
        }catch(err){
          setServerErrors(err.response.data.errors);
        }
      }
  return (
    <Box component="section" className="rgisterPage">
      <Typography component="h1" variant="h3">
          Login
      </Typography>

      {serverErrors?.length > 0? serverErrors.map((error) => <Typography color='error'>{error}</Typography>) :''}

      <Box onSubmit={handleSubmit(RigisterForm)} component="form" sx={{margin:2,display:"flex",flexDirection:"column",gap:2}}>
        <TextField fullWidth {...register("Email")} label="Email" variant="outlined"
        error={errors.Email}
        helperText={errors.Email?.message}
        />
        <TextField fullWidth {...register("Password")} label="Password" variant="outlined"
        error={errors.Password}
        helperText={errors.Password?.message}
        />
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          {isSubmitting? <CircularProgress />:'Login'}
          </Button>
      </Box>
    </Box>
    
  )
}
