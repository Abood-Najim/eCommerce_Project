import { Category, Language } from '@mui/icons-material';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'
import useCategories from '../../hooks/useCategories';
import { useTranslation } from 'react-i18next';

export default function Categories() {

  const {data,isLoading,isError,error} = useCategories();
  const {t} = useTranslation();
  if (isLoading) return <CircularProgress/>
  if (isError) return <Typography color='red'>{error.message}</Typography>
  return (
    <Box>
      <Typography component='h2' variant='h3'>{t('Categories')}</Typography>
      {data.response.data.map((category)=><Box> <Typography>{category.name}</Typography> </Box>)}
      </Box>
  )
}
