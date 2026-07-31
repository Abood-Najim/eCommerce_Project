import React, { useEffect } from 'react'
import authAxiosInstance from '../../api/authAxiosInstance';
import useAuthStore from '../../store/useAuthStore';
import useCart from '../../hooks/useCart';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { 
  Box, 
  Button, 
  IconButton, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  useTheme,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useRemoveFromCart from '../../hooks/useRemoveFromCart';
import useUpdateQuantity from '../../hooks/useUpdateQuantity';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import useClearCart from '../../hooks/useClearCart';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export default function Cart() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { data, isLoading, isError, error } = useCart();
  const { mutate: removeItem, isPending } = useRemoveFromCart();
  const { mutate: updateQuantity, isPending: updateQuantityPend } = useUpdateQuantity();
  const { mutate: clearCart, isPending: clearCartPend } = useClearCart();
  const { t } = useTranslation();

  const handleUpdate = (productId, action) => {
    const item = data.items.find(i => i.productId == productId);
    if (action == '+') {
      updateQuantity({ productId, count: item.count + 1 });
    } else {
      updateQuantity({ productId, count: item.count - 1 });
    }
  }

  useEffect(() => {
    if (!data || !data.items) return;
    const itemCounter = data.items
      .filter((item) => item.count === 0)
      .map((item) => item.productId);
    if (itemCounter.length > 0) {
      removeItem(itemCounter);
    }
  }, [data, removeItem]);

  if (isLoading) return <CircularProgress />
  if (isError) return <Typography color='red'>{error.message}</Typography>

  return (
    <Box component="section" sx={{ py: 6, px: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.5px' }}>
          {t('Cart')}
        </Typography>
        <Button 
          disabled={clearCartPend} 
          onClick={clearCart}
          variant="outlined"
          color="error"
          size="small"
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          {t('Clear Cart')}
        </Button>
      </Box>

      {data.items.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, textAlign: 'center', border: `1px solid ${theme.palette.divider}`, borderRadius: 3 }}>
          <ShoppingBagOutlinedIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            {t('Your cart is empty')}
          </Typography>
          <Button variant="contained" onClick={() => navigate('/products')} sx={{ textTransform: 'none', borderRadius: 2 }}>
            {t('Continue Shopping')}
          </Button>
        </Paper>
      ) : (
        <>
          <TableContainer component={Paper} elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 3 }}>
            <Table sx={{ minWidth: { xs: 650, md: 'auto' } }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'action.hover' }}>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'start' }}>{t('Product Name')}</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>{t('Price')}</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>{t('Quantity')}</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>{t('Total')}</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>{t('Actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.items.map((item) => (
                  <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500 }}>{item.productName}</Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{item.price}$</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          disabled={updateQuantityPend} 
                          onClick={() => handleUpdate(item.productId, '-')} 
                          sx={{ border: `1px solid ${theme.palette.divider}` }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ minWidth: 30, textAlign: 'center', fontWeight: 600 }}>{item.count}</Typography>
                        <IconButton 
                          size="small" 
                          disabled={updateQuantityPend} 
                          onClick={() => handleUpdate(item.productId, '+')} 
                          sx={{ border: `1px solid ${theme.palette.divider}` }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', fontWeight: 600, color: 'primary.main' }}>{item.totalPrice}$</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                        <IconButton 
                          size="small"
                          onClick={() => navigate(`/product/${item.productId}`)}
                          sx={{ color: 'primary.main' }}
                        >
                          <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          disabled={isPending} 
                          onClick={() => removeItem(item.productId)} 
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" onClick={() => navigate('/checkout')} sx={{ textTransform: 'none', borderRadius: 2, px: 3, py: 1.2 }}>
                {t('Proceed To Checkout')}
              </Button>
              <Button variant="outlined" onClick={() => navigate('/products')} sx={{ textTransform: 'none', borderRadius: 2, px: 3, py: 1.2 }}>
                {t('Continue Shopping')}
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}