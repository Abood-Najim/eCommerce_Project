import React, { useState, useEffect } from 'react';
import useProducts from '../../hooks/useProducts';
import useProductsByCategory from '../../hooks/useProductsByCategory';
import { 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Rating, 
  IconButton, 
  Button, 
  Skeleton, 
  useTheme, 
  alpha 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { toast } from 'react-toastify';
import useAddToCart from '../../hooks/useAddToCart';
import useLoginPromptStore from '../../store/useLoginPromptStore';
import useAuthStore from '../../store/useAuthStore';
import i18n from '../../i18next';

const Products = ({ 
  categoryId, 
  page = 1, 
  limit = 8, 
  sortBy = 'price', 
  ascending = false, 
  minPrice = '', 
  maxPrice = '', 
  minRating = '', 
  onTotalCountChange, 
  onPriceError 
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { mutate: addToCart } = useAddToCart();
  const [priceError, setPriceError] = useState('');
  const token = useAuthStore((state) => state.token);
  const openLoginPrompt = useLoginPromptStore((state) => state.openLoginPrompt);

  const { data, isLoading, isError, error } = categoryId
    ? useProductsByCategory(categoryId)
    : useProducts(page, limit, sortBy, ascending);

  useEffect(() => {
    if (isError && error?.message) {
      toast.error(t(error.message));
    }
  }, [isError, error, t]);

  const handleAddToCart = (productId, e) => {
    e.preventDefault();
    if (!token) {
      toast.warning(t('Please login to add items to your cart.'));
      openLoginPrompt();
      return;
    }
    addToCart(
      { productId, count: 1 },
      {
        onSuccess: () => {
          toast.success(t('Item added to cart successfully!'));
        },
        onError: (err) => {
          toast.error(t(err?.message || 'Failed to add item to cart.'));
        }
      }
    );
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    if (!token) {
      toast.warning(t('Please login to save items to your wishlist.'));
      openLoginPrompt();
      return;
    }
    toast.info(t('Added to wishlist!'));
  };

  const isRtl = i18n.language === 'ar';
  const iconElement = <ShoppingBagOutlinedIcon fontSize="small" />;

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {Array.from(new Array(4)).map((_, index) => (
          <Box 
            key={index} 
            sx={{ 
              width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 16px)', lg: '250px' }, 
              maxWidth: 250 
            }}
          >
            <Card 
              sx={{ 
                borderRadius: 3, 
                bgcolor: 'background.paper', 
                border: '1px solid',
                borderColor: 'divider', 
                overflow: 'hidden' 
              }}
            >
              <Skeleton 
                variant="rectangular" 
                height={200} 
                animation="wave" 
                sx={{ bgcolor: alpha(theme.palette.text.primary, 0.05) }} 
              />
              <CardContent sx={{ p: 2 }}>
                <Skeleton 
                  variant="text" 
                  width="85%" 
                  height={22} 
                  animation="wave" 
                  sx={{ bgcolor: alpha(theme.palette.text.primary, 0.05) }} 
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1.5 }}>
                  <Skeleton 
                    variant="text" 
                    width="35%" 
                    height={24} 
                    animation="wave" 
                    sx={{ bgcolor: alpha(theme.palette.text.primary, 0.05) }} 
                  />
                  <Skeleton 
                    variant="text" 
                    width="30%" 
                    height={20} 
                    animation="wave" 
                    sx={{ bgcolor: alpha(theme.palette.text.primary, 0.05) }} 
                  />
                </Box>
                <Skeleton 
                  variant="rectangular" 
                  height={38} 
                  sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.text.primary, 0.05) }} 
                  animation="wave" 
                />
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    );
  }

  if (isError) return <Typography color="error">{t(error.message)}</Typography>;

  let products = [];
  if (categoryId) {
    products = data?.response || [];
  } else {
    products = data?.response?.data || data?.data || data || [];
  }

  let currentError = '';
  if (Array.isArray(products)) {
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      currentError = t("Min price can't be higher than Max price.");
    } else {
      if (minPrice) products = products.filter((p) => p.price >= Number(minPrice));
      if (maxPrice) products = products.filter((p) => p.price <= Number(maxPrice));
    }
    if (currentError !== priceError) {
      setPriceError(currentError);
      if (currentError) {
        toast.error(currentError);
      }
      if (onPriceError) onPriceError(currentError);
    }
    if (minRating) products = products.filter((p) => (p.rate || 0) >= Number(minRating));

    if (sortBy === 'price') {
      products.sort((a, b) => (ascending ? a.price - b.price : b.price - a.price));
    } else if (sortBy === 'name') {
      products.sort((a, b) => {
        const nameA = a.name || '';
        const nameB = b.name || '';
        return ascending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });
    }
  }

  if (onTotalCountChange && Array.isArray(products)) {
    onTotalCountChange(products.length);
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h6" color="text.secondary">{t('No products found')}</Typography>
      </Box>
    );
  }

  return (
    <Box className="products" component="section" sx={{ minHeight:'65vh'}}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 , alignItems:'center',justifyContent:{xs:'center',md:'flex-start'} }}>
        {products.map((product) => (
          <Box 
            key={product.id} 
            sx={{ 
              width: { xs: '100%', sm: 'calc(50% - 20px)', md: 'calc(33.333% - 20px)', lg: '250px' }, 
              maxWidth: 250,
              flexGrow: 0,
              flexShrink: 0
            }}
          >
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <Card 
                sx={{
                  position: 'relative',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: 'none',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  backgroundColor: 'background.paper',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0px 12px 28px ${alpha(theme.palette.primary.main, 0.2)}`,
                    '& .product-img': {
                      transform: 'scale(1.06)'
                    }
                  }
                }}
              >
                <IconButton
                  size="small"
                  onClick={handleAddToWishlist}
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: isRtl ? 'auto' : 10,
                    left: isRtl ? 10 : 'auto',
                    zIndex: 2,
                    backgroundColor: alpha(theme.palette.background.paper, 0.6),
                    backdropFilter: 'blur(4px)',
                    color: 'text.primary',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      backgroundColor: theme.palette.error.main,
                      borderColor: theme.palette.error.main,
                      color: '#ffffff'
                    }
                  }}
                >
                  <FavoriteBorderIcon sx={{ fontSize: '1.1rem' }} />
                </IconButton>

                <Box 
                  sx={{
                    width: '100%',
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                    p: 2.5,
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <CardMedia
                    component="img"
                    className="product-img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </Box>

                <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography 
                    component="h3" 
                    sx={{ 
                      fontWeight: 600, 
                      fontSize: '0.9rem',
                      lineHeight: 1.35,
                      color: 'text.primary',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '2.5em',
                      mb: 1.5
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography 
                      component="span" 
                      sx={{ 
                        fontWeight: 700, 
                        color: theme.palette.primary.main, 
                        fontSize: '1.1rem',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      ${product.price}
                    </Typography>
                    
                    <Rating
                      value={product.rate || 0}
                      readOnly
                      size="small"
                      sx={{ 
                        color: theme.palette.primary.main, 
                        fontSize: '0.8rem',
                        '& .MuiRating-iconEmpty': {
                          color: alpha(theme.palette.text.secondary, 0.3)
                        }
                      }}
                    />
                  </Box>

                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="contained"
                      size="medium"
                      startIcon={!isRtl ? iconElement : undefined}
                      endIcon={isRtl ? iconElement : undefined}
                      fullWidth
                      disableElevation
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        py: 1,
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        boxShadow: 'none',
                        '&:hover': {
                          boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`
                        }
                      }}
                      onClick={(e) => handleAddToCart(product.id, e)}
                    >
                      {t('Add to Cart')}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Products;