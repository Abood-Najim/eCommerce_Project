import React, { useState } from 'react'
import useProduct from '../../hooks/useProduct'
import { useParams, Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  CircularProgress, 
  Typography, 
  Container, 
  Rating, 
  Divider, 
  Paper,
  useTheme,
  IconButton,
  Chip,
  Tabs,
  Tab
} from '@mui/material';
import useAddToCart from '../../hooks/useAddToCart';
import { useTranslation } from 'react-i18next';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function ProductDetails() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { id } = useParams();
  const { mutate: addToCart } = useAddToCart();
  const { data, isLoading, isError, error } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);

  const handleAddToCart = () => {
    addToCart({ productId: data.response.id, count: quantity });
  };

  if (isLoading) return <CircularProgress />
  if (isError) return <Typography color='red'>{error.message}</Typography>

  const reviewCount = data.response.reviews?.length || 0;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xxl" sx={{ py: 6 }}>
      
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5, mb: 4, color: 'text.secondary', fontSize: '0.8rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
          {t('Home')}
        </Link>
        <Typography component="span" sx={{ color: 'text.secondary' }}> &gt; </Typography>
        <Link to="/products" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
          {t('Products')}
        </Link>
        <Typography component="span" sx={{ color: 'text.secondary' }}> &gt; </Typography>
        <Typography component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>
          {data.response.name}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start' }}>
        
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          gap: 2, 
          flex: { xs: '0 0 100%', md: '0 0 60%' },
          maxWidth: { xs: '100%', md: '700px' }, 
          mx: { xs: 'auto', md: 0 }
        }}>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'row', md: 'column' },
            gap: 1.5,
            flex: { xs: '0 0 auto', md: '0 0 80px' }
          }}>
            {[1, 2, 3].map((thumb) => (
              <Paper
                key={thumb}
                elevation={0}
                sx={{
                  width: { xs: 60, md: 70 },
                  height: { xs: 60, md: 70 },
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backgroundColor: 'background.paper',
                  '&:hover': { borderColor: theme.palette.primary.main }
                }}
              >
                <Box
                  component="img"
                  src={data.response.image}
                  alt={`Thumbnail ${thumb}`}
                  sx={{ width: '80%', height: '80%', objectFit: 'contain' }}
                />
              </Paper>
            ))}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Paper 
              elevation={0} 
              sx={{  
                border: `1px solid ${theme.palette.divider}`, 
                borderRadius: 3,
                backgroundColor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box
                component="img"
                src={data.response.image}
                alt={data.response.name}
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 3,
                  objectFit: 'contain'
                }}
              />
            </Paper>
          </Box>
        </Box>

        <Box sx={{ flex: { xs: '0 0 100%', md: '1' }, maxWidth: { xs: '100%' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            
            <Box>
              <Chip 
                label={t('Limited Edition')} 
                size="small" 
                sx={{ 
                  bgcolor: '#E0F2FE', 
                  color: '#0284C7', 
                  fontWeight: 600, 
                  fontSize: '0.7rem',
                  borderRadius: 1
                }} 
              />
            </Box>

            <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
              {data.response.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Rating 
                value={data.response.rate || 0} 
                readOnly 
                precision={0.5} 
                sx={{ color: theme.palette.error.main }} 
              />
              <Typography variant="body2" color="text.secondary">
                ({reviewCount} {t('Reviews')})
              </Typography>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
              ${data.response.price}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: data.response.quantity > 0 ? '#16A34A' : '#EF4444' }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {data.response.quantity > 0 ? t('In Stock') : t('Out of Stock')}
              </Typography>
              {data.response.quantity > 0 && (
                <Typography variant="body2" color="text.secondary">
                  • {t('Ready to ship within 48 hours')}
                </Typography>
              )}
            </Box>

            <Divider />

            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, fontWeight: 400 }}>
              {t('Elevate your cooking experience with the ROYALSTAR Digital Air Fryer, the versatile kitchen companion perfect for modern homes.')}
            </Typography>

            <Divider />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {t('Select Quantity')}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                overflow: 'hidden'
              }}>
                <IconButton 
                  size="small" 
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(prev => prev - 1)}
                  sx={{ px: 1.5, py: 1, borderRadius: 0, '&:hover': { bgcolor: 'action.hover' } }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography sx={{ px: 2, py: 1, fontWeight: 600, minWidth: 30, textAlign: 'center' }}>
                  {quantity}
                </Typography>
                <IconButton 
                  size="small" 
                  onClick={() => setQuantity(prev => prev + 1)}
                  sx={{ px: 1.5, py: 1, borderRadius: 0, '&:hover': { bgcolor: 'action.hover' } }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Button 
              variant="contained" 
              size="large" 
              fullWidth 
              startIcon={<ShoppingBagOutlinedIcon />}
              onClick={handleAddToCart}
              disabled={data.response.quantity === 0}
              sx={{ 
                py: 1.8, 
                textTransform: 'none', 
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              {t('Add to Cart')}
            </Button>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  flex: 1, 
                  p: 2, 
                  border: `1px solid ${theme.palette.divider}`, 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  minWidth: 140
                }}
              >
                <Box sx={{ color: theme.palette.primary.main, display: 'flex' }}>
                  <ShoppingBagOutlinedIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                    {t('Free Delivery')}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t('On orders over $500')}
                  </Typography>
                </Box>
              </Paper>
              <Paper 
                elevation={0} 
                sx={{ 
                  flex: 1, 
                  p: 2, 
                  border: `1px solid ${theme.palette.divider}`, 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  minWidth: 140
                }}
              >
                <Box sx={{ color: theme.palette.primary.main, display: 'flex' }}>
                  <ShoppingBagOutlinedIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                    {t('2 Year Warranty')}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t('Full coverage protection')}
                  </Typography>
                </Box>
              </Paper>
            </Box>

          </Box>
        </Box>

      </Box>

      <Box sx={{ mt: 8, maxWidth: '100%' ,pl:{ xs:0 , md:8}}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            textColor="primary"
            indicatorColor="primary"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                minWidth: 'auto',
                px: 3
              }
            }}
          >
            <Tab label={t('Description')} />
            <Tab label={`${t('Customer Reviews')} (${reviewCount})`} />
          </Tabs>
        </Box>
        {tabValue === 0 && (
          <Box sx={{ py: 2 }}>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {data.response.description}
            </Typography>
          </Box>
        )}
        {tabValue === 1 && (
          <Box sx={{ py: 2 }}>
            {data.response.reviews && data.response.reviews.length > 0 ? (
              data.response.reviews.map((review, index) => (
                <Box key={index} sx={{ mb: 3, pb: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {review.userName}
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" sx={{ color: theme.palette.error.main }} />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {review.comment}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography color="text.secondary">{t('No reviews yet.')}</Typography>
            )}
          </Box>
        )}
      </Box>
      
    </Container>
  )
}
/*whe we send data to Mutation we send it like how we do the object ({parameter:1,Parameter:2,......}) */