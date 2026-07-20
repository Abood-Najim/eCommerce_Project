import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';

export default function ProfileLayout() {
  const {t} = useTranslation();
  return (
    <Box>
      <Typography>{t('My Profile')}</Typography>
      
      <Link to=''>{t('Info')}</Link>
      <Link to='orders'>{t('Orders')}</Link>

      <Box>
        <Outlet />
      </Box>
    </Box>
  )
}
