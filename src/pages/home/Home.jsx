import React from 'react'
import { Box, Typography, Button, Container, useTheme, Chip, alpha, Paper, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import useCategories from '../../hooks/useCategories'
import useProducts from '../../hooks/useProducts'
import useProduct from '../../hooks/useProduct'
import ComputerIcon from '@mui/icons-material/Computer'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import CategoryIcon from '@mui/icons-material/Category';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import heroImage from './assets/hero.jpg'
import keyboardImage from './assets/keyboard.jpg'
import deskImage from './assets/deskSetup.jpg'

export default function Home() {
  const { t } = useTranslation()
  const theme = useTheme()
  const { data: categoriesData } = useCategories()
  const categories = categoriesData?.response?.data || []
  const { data: productsData } = useProducts(1, 4)
  const products = productsData?.response?.data || []
  const { data: productData } = useProduct(5)
  const reviews = productData?.response?.reviews || []

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
    <Box>
    <Container maxWidth="xxl" sx={{ px: { xs: 0, md: 6 } }}>
      <Box sx={{ p: { sm: 0, md: 5, lg: 15 }, pb: { sm: 5 } }}>

        <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: 8, position: 'relative', minHeight: '500px', backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: alpha(theme.palette.background.default, 0.88), borderRadius: { sm: 0, md: 3 } }} />

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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2, px: { xs: 5 } }}>
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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 3,
          overflowX: { xs: 'auto', md: 'visible' },
          flexWrap: { xs: 'nowrap', md: 'wrap' },
          pb: { xs: 2, md: 0 },
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {categories.slice(0, 4).map((category) => (
          <Box
            key={category.id}
            sx={{
              flex: { xs: '0 0 45%', sm: '0 0 30%', md: 'auto' },
              minWidth: { xs: 140, md: 250 }
            }}
          >
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
                  backgroundColor: alpha(theme.palette.background.paper, 0.6),
                  borderRadius: 3,
                  outline: `2px solid transparent`,
                  minHeight: 250,
                  width: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    outlineColor: theme.palette.primary.main,
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
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 10, mb: 4, px: { xs: 0, md: 0 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
          {t('Curated Favorites')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('Handpicked just for you.')}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>

        <Paper
          elevation={0}
          sx={{
            flex: { xs: 'auto', md: 7 },
            position: 'relative',
            p: 4,
            overflow: 'hidden',
            borderRadius: 3,
            minHeight: 450,
            backgroundImage: `url(${keyboardImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}
        >
          <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
            <Chip label={t('Best Seller')} size="small" sx={{ bgcolor: '#DC2626', color: '#fff', fontWeight: 700, fontSize: '0.65rem', borderRadius: 1 }} />
          </Box>
          <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '100%' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>{t('Vertex Pro Mechanical')}</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2, lineHeight: 1.4, maxWidth: 350 }}>{t('The ultimate tactile experience for creators and developers.')}</Typography>
            <Button component={Link} to="/products" variant="contained" sx={{ bgcolor: '#fff', color: '#000', textTransform: 'none', borderRadius: 2, '&:hover': { bgcolor: '#f0f0f0' } }}>{t('Shop Now')}</Button>
          </Box>
        </Paper>

        <Box sx={{ flex: { xs: 'auto', md: 3 } }}>
          {products.length > 0 && (
            <Link to={`/product/${products[0]?.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}`, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', transition: 'all 0.3s ease', '&:hover': { boxShadow: `0px 8px 24px ${alpha(theme.palette.text.primary, 0.1)}`, transform: 'translateY(-2px)' } }}>
                <Box sx={{ width: { xs: 100, md: 140 }, height: 140, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
                  <Box component="img" src={products[0]?.image} alt={products[0]?.name} sx={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 1 }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>{products[0]?.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{t('Precision engineered')}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>${products[0]?.price}</Typography>
                </Box>
              </Paper>
            </Link>
          )}
        </Box>

      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>

        <Box sx={{ flex: { xs: 'auto', md: 3 } }}>
          {products.length > 1 && (
            <Link to={`/product/${products[1]?.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}`, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', transition: 'all 0.3s ease', '&:hover': { boxShadow: `0px 8px 24px ${alpha(theme.palette.text.primary, 0.1)}`, transform: 'translateY(-2px)' } }}>
                <Box sx={{ width: { xs: 100, md: 140 }, height: 140, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
                  <Box component="img" src={products[1]?.image} alt={products[1]?.name} sx={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 1 }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>{products[1]?.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{t('Studio quality sound')}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>${products[1]?.price}</Typography>
                </Box>
              </Paper>
            </Link>
          )}
        </Box>

        <Paper
          elevation={0}
          sx={{
            flex: { xs: 'auto', md: 7 },
            position: 'relative',
            p: 4,
            overflow: 'hidden',
            borderRadius: 3,
            minHeight: 220,
            backgroundImage: `url(${deskImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '100%' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>{t('Lumina Desk Suite')}</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2, lineHeight: 1.4, maxWidth: 400 }}>{t('Complete your modern home office setup.')}</Typography>
            <Button component={Link} to="/products" variant="contained" sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}>{t('Explore Bundle')}</Button>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 12, mb: 8, px: { xs: 0, md: 0 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1, textAlign: 'center' }}>
          {t('Voices of the Collective')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 6 }}>
          {t('Trusted by creators worldwide.')}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {reviews.slice(0, 3).map((review, index) => (
            <Paper key={index} elevation={0} sx={{ flex: 1, p: 4, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
              <Box sx={{ display: 'flex', gap: 0.5, mb: 2, color: theme.palette.primary.main }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < review.rating ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                  </span>
                ))}
              </Box>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, color: 'text.primary', fontStyle: 'italic' }}>
                “{review.comment}”
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{review.userName}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Link to={`/product/${products[index]?.id}`} style={{ color: theme.palette.primary.main, fontWeight: 500, textDecoration: 'underline', fontSize: '0.85rem' }}>
                  {t('View Product')}
                </Link>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      
    </Container>
    <Box 
        sx={{ 
          mt: 12, 
          py: { xs: 4, md: 20 }, 
          px: { xs: 1, md: 3 }, 
          backgroundColor: theme.palette.mode === 'light' ? '#1a1a2e' : theme.palette.primary.dark,
          color: '#fff',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4
        }}
      >
        <Box sx={{ flex: 1, maxWidth: { md: '500px' } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {t('Stay Ahead of the Curve')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            {t('Join our exclusive newsletter for early access to limited edition drops, designer collaborations, and technological insights.')}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: '100%', maxWidth: { md: '400px' } }}>
          <TextField
            placeholder={t('Enter your email')}
            variant="outlined"
            fullWidth
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.1)',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                fieldset: { borderColor: 'transparent' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255,255,255,0.6)',
              },
            }}
          />
          <Button 
            variant="contained" 
            sx={{ 
              px: 4, 
              py: 1.2, 
              textTransform: 'none', 
              fontWeight: 600, 
              borderRadius: 2,
              whiteSpace: 'nowrap'
            }}
          >
            {t('Subscribe')}
          </Button>
        </Box>
      </Box>
      </Box>
  )
}