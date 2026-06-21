import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'


export default function Register() {

      const {register,handleSubmit}  = useForm();
      const RigisterForm = async (data)=>{
        try{
          const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Register`,data);
          console.log(response);
        }catch(err){
          console.log(err);
        }
      }
  return (
    <Box component="section" className="rgisterPage">
      <Typography component="h1" variant="h3">
          Register
      </Typography>
      <Box onSubmit={handleSubmit(RigisterForm)} component="form" sx={{margin:2,}}>
        <TextField fullWidth {...register("UserName")} label="UserName" variant="outlined" sx={{margin:2,}}/>
        <TextField fullWidth {...register("FullName")} label="FullName" variant="outlined"sx={{margin:2,}} />
        <TextField fullWidth {...register("PhoneNumber")} label="PhoneNumber" variant="outlined" sx={{margin:2,}}/>
        <TextField fullWidth {...register("Email")} label="Email" variant="outlined" sx={{margin:2,}}/>
        <TextField fullWidth {...register("Password")} label="Password" variant="outlined" sx={{margin:2,}}/>
        <Button variant="contained" type="submit">
          Register
          </Button>
      </Box>
    </Box>
    
  )
}
