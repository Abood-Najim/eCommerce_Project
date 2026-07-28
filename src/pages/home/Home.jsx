import React from 'react'
import { Box, Typography, Button, Container, useTheme, Chip, alpha, Grid, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import useCategories from '../../hooks/useCategories'
import ComputerIcon from '@mui/icons-material/Computer'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import CategoryIcon from '@mui/icons-material/Category';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import heroImage from './assets/hero.jpg'

export default function Home() {
  const { t } = useTranslation()
  const theme = useTheme()
  const { data: categoriesData } = useCategories()
  const categories = categoriesData?.response?.data || []

  const getCategoryIcon = (name) => {
    const lower = name.toLowerCase()
    if (lower.includes('computer') || lower.includes('laptop') || lower.includes('pc') || lower.includes('electronics')) return <ComputerIcon sx={{ fontSize: 48 }} />
    if (lower.includes('audio') || lower.includes('headphone') || lower.includes('ear')) return <HeadphonesIcon sx={{ fontSize: 48 }} />
    if (lower.includes('phone') || lower.includes('mobile')) return <PhoneAndroidIcon sx={{ fontSize: 48 }} />
    if (lower.includes('wears') || lower.includes('clothes')) return <CheckroomIcon sx={{ fontSize: 48 }} />
    if (lower.includes('game') || lower.includes('console')) return <SportsEsportsIcon sx={{ fontSize: 48 }} />
    return <CategoryIcon sx={{ fontSize: 48 }} />
  }/*i can add any icon i want here i just add the name of the category and put the elegable Icon for it*/ 

  return (
      <Container maxWidth="xxl" sx={{ px: { xs: 0, md: 6 } }}>
    <Box sx={{ p: {sm:0,md:5,lg:15} }}>
        
        <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: 8, position: 'relative', minHeight: '500px', backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: alpha(theme.palette.background.default,0.88), borderRadius:{ sm:0,md:3} }} />

          <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 400 }}>
            <Chip 
              label={t('PREMIUM DIGITAL BOUTIQUE')} 
              size="small" 
              sx={{ 
                bgcolor: theme.palette.secondary.main, 
                color: '#fff', 
                fontWeight: 700, 
                fontSize: '0.65rem',
                letterSpacing: '0.5px',
                borderRadius: 5,
                mb: 3,
                px: 2
              }} 
            />
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 2, lineHeight: 1.2 }}>
              {t('Elevate Your Digital Horizon')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
              {t('Experience the pinnacle of performance and aesthetics with our curated collection of visionary tech.')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Button component={Link} to="/products" variant="contained" sx={{ px: 4, py: 1.2, borderRadius: 2, textTransform: 'none', fontWeight: 600, width: '100%', maxWidth: 300 }}>
                {t('Shop Collection')}
              </Button>
              <Button component={Link} to="/products" variant="text" endIcon={<ArrowForwardIcon />} sx={{ textTransform: 'none', fontWeight: 600, color: 'primary.main' }}>
                {t('View Vision')}
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', alignItems: 'center', gap: 6, py: 10, minHeight: '600px' }}>
          <Box sx={{ flex: 1, maxWidth: '100%' }}>
            <Chip 
              label={t('PREMIUM DIGITAL BOUTIQUE')} 
              size="small" 
              sx={{ 
                bgcolor: theme.palette.secondary.main, 
                color: '#fff', 
                fontWeight: 700, 
                fontSize: '0.65rem',
                letterSpacing: '0.5px',
                borderRadius: 5,
                mb: 3,
                px: 2
              }} 
            />
            <Typography variant="h2" sx={{ fontWeight: 700, color: 'text.primary', mb: 2, lineHeight: 1.1 }}>
              {t('Elevate Your Digital Horizon')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6, maxWidth: 450 }}>
              {t('Experience the pinnacle of performance and aesthetics with our curated collection of visionary tech.')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button component={Link} to="/products" variant="contained" size="large" endIcon={<ArrowForwardIcon />} sx={{ px: 4, py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                {t('Shop Collection')}
              </Button>
              <Button component={Link} to="/products" variant="text" endIcon={<ArrowForwardIcon />} sx={{ textTransform: 'none', fontWeight: 600, color: 'primary.main' }}>
                {t('View Vision')}
              </Button>
            </Box>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Box component="img" src={heroImage} alt="Lumina Luxe Hero" sx={{ maxWidth: '100%', height: 'auto', borderRadius: 4, boxShadow: '0 20px 40px rgba(0,0,0,0.2)', objectFit: 'cover' }} />
          </Box>
        </Box>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {t('Browse by category')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {t('Find the perfect match for your workflow.')}
            </Typography>
          </Box>
          <Link to="/categories" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
              {t('View All')}
            </Typography>
          </Link>
        </Box>

        <Grid container spacing={3}>
          {categories.slice(0, 4).map((category) => (
            <Grid item xs={6} sm={4} md={3} key={category.id} >
              <Link 
                to={`/products?categoryId=${category.id}`}
                style={{ textDecoration: 'none' }}
                
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    backgroundColor: alpha(theme.palette.background.default,1),
                    borderRadius: 3,
                    minHeight: 250,
                    minWidth:250,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      outline: `2px solid ${theme.palette.primary.main}`, 
                      transform: 'translateY(-4px)',
                      boxShadow: `0px 8px 24px ${alpha(theme.palette.text.primary, 0.15)}`,
                    }
                  }}
                >
                  <Box sx={{ color: theme.palette.text.secondary }}>
                    {getCategoryIcon(category.name)}
                  </Box>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'text.primary',
                      textAlign: 'center'
                    }}
                  >
                    {category.name}
                  </Typography>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
  )
}