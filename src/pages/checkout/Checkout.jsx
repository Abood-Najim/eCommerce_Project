import React, { useState } from 'react'
import useCart from '../../hooks/useCart'
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Divider,
  useTheme,
  Snackbar,
  Alert
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useCheckout from '../../hooks/useCheckout';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PaymentsIcon from '@mui/icons-material/Payments';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export default function Checkout() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data, isLoading, isError, error } = useCart();
  const { mutate: checkOut, isSuccess } = useCheckout();
  const [paymentMethod, setPaymentMethod] = useState('');

  if (isLoading) return <CircularProgress />
  if (isError) return <Typography color='red'>{error.message}</Typography>

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 4 }, maxWidth: '900px', mx: 'auto' }}>
      <Snackbar
        open={isSuccess && paymentMethod === 'Cash'}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%', borderRadius: 2, fontWeight: 500 }}>
          {t('Order confirmed.')}
        </Alert>
      </Snackbar>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <ShoppingBagOutlinedIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.5px' }}>
          {t('Checkout')}
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, mb: 4, border: `1px solid ${theme.palette.divider}`, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          {t('Order Summary')}
        </Typography>

        <TableContainer>
          <Table sx={{ minWidth: { xs: 500, md: 'auto' } }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'action.hover' }}>
                <TableCell sx={{ fontWeight: 600 }}>{t('Product Name')}</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>{t('Price')}</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>{t('Quantity')}</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>{t('Total')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items.map((item) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ fontWeight: 500 }}>{item.productName}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{item.price}$</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{item.count}</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 600, color: theme.palette.primary.main }}>{item.totalPrice}$</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('Total')}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
            ${data?.items?.reduce((acc, item) => acc + (item.totalPrice || 0), 0) || 0}
          </Typography>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}`, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          {t('Payment Method')}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
          <Box
            onClick={() => setPaymentMethod('Cash')}
            sx={{
              flex: 1,
              minWidth: 120,
              maxWidth: 200,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              borderRadius: 2,
              cursor: 'pointer',
              border: `2px solid ${paymentMethod === 'Cash' ? theme.palette.primary.main : theme.palette.divider}`,
              backgroundColor: 'background.paper',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: theme.palette.primary.main,
              }
            }}
          >
            <PaymentsIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: paymentMethod === 'Cash' ? theme.palette.primary.main : 'text.primary' }}>
              {t('Cash')}
            </Typography>
          </Box>

          <Box
            onClick={() => setPaymentMethod('Visa')}
            sx={{
              flex: 1,
              minWidth: 120,
              maxWidth: 200,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              borderRadius: 2,
              cursor: 'pointer',
              border: `2px solid ${paymentMethod === 'Visa' ? theme.palette.primary.main : theme.palette.divider}`,
              backgroundColor: 'background.paper',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: theme.palette.primary.main,
              }
            }}
          >
            <CreditCardIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: paymentMethod === 'Visa' ? theme.palette.primary.main : 'text.primary' }}>
              {t('Visa')}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => window.history.back()}
            sx={{ textTransform: 'none', borderRadius: 2, px: 3, py: 1.2 }}
          >
            {t('Back')}
          </Button>
          <Button
            variant="contained"
            disabled={!paymentMethod}
            onClick={() => checkOut({ paymentMethod })}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 4,
              py: 1.2,
              minWidth: 120
            }}
          >
            {t('Pay Now')}
          </Button>
        </Box>
      </Paper>

    </Box>
  )
}