import { Category, Language } from '@mui/icons-material';
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import useCategories from '../../hooks/useCategories';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export default function Categories() {
  const { data, isLoading, isError, error } = useCategories();
  const { t } = useTranslation();

  useEffect(() => {
    if (isError && error?.message) {
      toast.error(t(error.message));
    }
  }, [isError, error, t]);

  if (isLoading) return <CircularProgress />
  if (isError) return <Typography color='red'>{t(error.message)}</Typography>

  return (
    <Box>
      <Typography component='h2' variant='h3'>{t('Categories')}</Typography>
      {data?.response?.data?.map((category) => (
        <Box key={category.id || category.name}>
          <Typography>{category.name}</Typography>
        </Box>
      ))}
    </Box>
  )
}