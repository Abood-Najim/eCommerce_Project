import React from 'react'
import useProducts from '../../hooks/useProducts';
import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography, Rating, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import useAddToCart from '../../hooks/useAddToCart';

const Products = () => {

  const { data, isLoading, isError, error } = useProducts();
  const {t} = useTranslation();
  const { mutate: addToCart } = useAddToCart();

  const handleAddToCart = (productId, e) => {
    e.preventDefault();
    addToCart({ productId, count: 1 });
  };

  if (isLoading) return <CircularProgress />
  if (isError) return <Typography color='red'>{error.message}</Typography>

  return (
    <Box className="products" component="section">
      <Typography component="h1" variant="h2" sx={{ mb: 3, textAlign: 'left' }}>{t('Products')}</Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>

        {data.response.data.map((product) => {
          return (
            <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <Card sx={{ 
                  position: 'relative', 
                  borderRadius: 2, 
                  border: '1px solid', 
                  borderColor: 'divider', 
                  boxShadow: 'none', 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease', 
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0px 8px 20px rgba(0,0,0,0.08)' } 
                }}>
                  
                  <IconButton 
                    size="small"
                    sx={{ 
                      position: 'absolute', 
                      top: 10, 
                      right: 10, 
                      color: 'text.secondary',
                      '&:hover': { color: '#F43F5E' } 
                    }}
                  >
                    <FavoriteBorderIcon fontSize="small" />
                  </IconButton>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'background.default',
                    maxWidth: '100%'
                  }}>
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>

                  <CardContent sx={{ pt: 0.5, px: 2, pb: 2, textAlign: 'left', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                      <Typography component="h3" variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                        {product.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating 
                          value={product.rate || 0} 
                          readOnly 
                          size="small" 
                          sx={{ color: '#F43F5E', fontSize: '1rem' }} 
                        />
                      </Box>
                    </Box>

                    <Typography component="span" variant="h6" sx={{ fontWeight: 700, color: 'primary.main', display: 'block', mb: 2 }}>
                      ${product.price}
                    </Typography>

                    <Box sx={{ mt: 'auto' }}>
                      <Button 
                        variant="contained" 
                        size="small" 
                        startIcon={<ShoppingBagOutlinedIcon fontSize="small" />}
                        fullWidth
                        sx={{ 
                          textTransform: 'none', 
                          borderRadius: 2, 
                          py: 0.8,
                          fontWeight: 600,
                          fontSize: '0.85rem'
                        }}
                        onClick={(e) => handleAddToCart(product.id, e)}
                      >
                        {t('Add to Cart')}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default Products;