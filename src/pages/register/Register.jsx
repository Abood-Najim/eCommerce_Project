import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from '../../validations/RegisterSchema'

export default function Register() {

      const [serverErrors,setServerErrors] = useState([])

      const {register,handleSubmit,formState:{errors,isSubmitting}}  = useForm(
        {
          resolver:yupResolver(registerSchema)
        }
      );
      const RigisterForm = async (data)=>{
        try{
          const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Register`,data);
          console.log(response);
        }catch(err){
          setServerErrors(err.response.data.errors);
        }
      }
  return (
    <Box component="section" className="rgisterPage">
      <Typography component="h1" variant="h3">
          Register
      </Typography>

      {serverErrors?.length > 0? serverErrors.map((error) => <Typography color='error'>{error}</Typography>) :''}

      <Box onSubmit={handleSubmit(RigisterForm)} component="form" sx={{margin:2,display:"flex",flexDirection:"column",gap:2}}>
        <TextField fullWidth {...register("UserName")} label="UserName" variant="outlined" 
        error={errors.UserName}
        helperText={errors.UserName?.message}
        />
        <TextField fullWidth {...register("FullName")} label="FullName" variant="outlined"
        error={errors.FullName}
        helperText={errors.FullName?.message}
        />
        <TextField fullWidth {...register("PhoneNumber")} label="PhoneNumber" variant="outlined"
        error={errors.PhoneNumber}
        helperText={errors.PhoneNumber?.message}
        />
        <TextField fullWidth {...register("Email")} label="Email" variant="outlined"
        error={errors.Email}
        helperText={errors.Email?.message}
        />
        <TextField fullWidth {...register("Password")} label="Password" variant="outlined"
        error={errors.Password}
        helperText={errors.Password?.message}
        />
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          {isSubmitting? <CircularProgress />:'Register'}
          </Button>
      </Box>
    </Box>
    
  )
}
