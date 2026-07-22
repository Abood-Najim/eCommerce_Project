import React from 'react'
import useProduct from '../../hooks/useProduct'
import { useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import useAddToCart from '../../hooks/useAddToCart';
import { useTranslation } from 'react-i18next';

export default function ProductDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { mutate: addToCart } = useAddToCart();
  const { data, isLoading, isError, error } = useProduct(id);

  if (isLoading) return <CircularProgress />
  if (isError) return <Typography color='red'>{error.message}</Typography>

  console.log(data);
  return (
    <Box>
      <Typography>{data.response.name}</Typography>
      <Typography>{data.response.description}</Typography>
      <Button onClick={() => { addToCart({ productId: data.response.id, count: 1 }) }}>
        {t('Add to Cart')}
      </Button>
    </Box>
  )
}
/*whe we send data to Mutation we send it like how we do the object ({parameter:1,Parameter:2,......}) */