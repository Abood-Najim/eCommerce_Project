import React, { useEffect } from 'react'
import { Box, Typography, Paper, CircularProgress, useTheme, alpha } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import useCategories from '../../hooks/useCategories'
import getCategoryIcon from '../../utils/getCategoryIcon'

export default function Categories() {
  const { t } = useTranslation()
  const theme = useTheme()
  
  const { data, isLoading, isError, error } = useCategories()

  useEffect(() => {
    if (isError) {
      toast.error(t(error?.message || 'Failed to load categories.'))
    }
  }, [isError, error, t])

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
      <CircularProgress />
    </Box>
  )

  if (isError) return (
    <Box sx={{ textAlign: 'center', py: 10 }}>
      <Typography color='error' variant="h6">{t(error?.message || 'Failed to load categories.')}</Typography>
    </Box>
  )

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 4 }, minHeight: '100vh', maxWidth: '1200px', mx: 'auto' }}>
      <Box sx={{ mb: 4, textAlign: { xs: 'center', md: 'start' } }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            color: 'text.primary',
            letterSpacing: '-0.5px'
          }}
        >
          {t('Categories')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {t('Browse through our top categories')}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {data?.response?.data?.map((category) => (
          <Box
            key={category.id}
            component={Link}
            to={`/products?categoryId=${category.id}`}
            sx={{
              textDecoration: 'none',
              flex: {
                xs: '1 1 calc(50% - 12px)',
                sm: '1 1 calc(33.333% - 16px)',
                md: '1 1 calc(25% - 18px)'
              },
              minWidth: 0
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                position: 'relative',
                overflow: 'hidden',
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
                  boxShadow: `0px 12px 28px ${alpha(theme.palette.common.black, 0.12)}`,
                  borderColor: theme.palette.primary.main,
                  '& .static-top-bar': {
                    opacity: 1
                  },
                  '& .category-icon': {
                    color: theme.palette.primary.main,
                    transform: 'scale(1.1)'
                  },
                  '& .static-arrow': {
                    opacity: 1,
                    transform: 'translateX(0)'
                  }
                }
              }}
            >
              <Box
                className="static-top-bar"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  backgroundColor: theme.palette.primary.main,
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
              />

              <Box 
                className="category-icon"
                sx={{ 
                  mb: 2, 
                  p: 2,
                  borderRadius: '50%',
                  backgroundColor: alpha(theme.palette.primary.main, 0.06),
                  color: 'text.secondary',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {getCategoryIcon(category.name, 36)}
              </Box>

              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 0.5
                }}
              >
                {category.name}
              </Typography>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
              >
                {category.productCount !== undefined ? `${category.productCount} ${t('Products')}` : t('Explore')}
              </Typography>

              <Box
                className="static-arrow"
                sx={{
                  mt: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  color: theme.palette.primary.main,
                  opacity: 0,
                  transform: 'translateX(-6px)',
                  transition: 'all 0.3s ease'
                }}
              >
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  )
}