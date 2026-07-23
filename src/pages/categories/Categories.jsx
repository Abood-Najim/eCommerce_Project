import React from 'react'
import { Box, Grid, Typography, Paper, CircularProgress, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import useCategories from '../../hooks/useCategories'

export default function Categories() {
  const { t } = useTranslation()
  const theme = useTheme()
  
  const { data, isLoading, isError, error } = useCategories()

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
      <CircularProgress />
    </Box>
  )

  if (isError) return (
    <Box sx={{ textAlign: 'center', py: 10 }}>
      <Typography color='error' variant="h6">{error?.message || t('Failed to load categories.')}</Typography>
    </Box>
  )

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 4 }, minHeight:'100vh' }}>
      <Typography 
        variant="h3" 
        component="h1" 
        sx={{ 
          fontWeight: 600, 
          mb: 4, 
          color: 'text.primary',
          textAlign: { xs: 'center', md: 'start' }
        }}
      >
        {t('Categories')}
      </Typography>

      <Grid container spacing={3}>
        {data?.response?.data?.map((category) => (
          <Grid item xs={6} sm={4} md={3} key={category.id}>
            <Link 
              to={`/products?categoryId=${category.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: 'background.paper',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0px 8px 24px rgba(0,0,0,0.08)',
                    borderColor: theme.palette.primary.main,
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary'
                  }}
                >
                  {category.name}
                </Typography>
                
                {category.productCount !== undefined && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {category.productCount} {t('Products')}
                  </Typography>
                )}
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}