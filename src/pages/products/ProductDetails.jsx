import React from 'react'
import useProduct from '../../hooks/useProduct'
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function ProductDetails() {

  const {id} = useParams();
  const { data, isLoading, isError, error } = useProduct(id);

  if (isLoading) return <CircularProgress />
  if (isError) return <Typography color='red'>{error.message}</Typography>

  console.log(data);
  return (
    <Box>
      <Typography>{data.response.name}</Typography>
      <Typography>{data.response.description}</Typography>
    </Box>
  )
}

