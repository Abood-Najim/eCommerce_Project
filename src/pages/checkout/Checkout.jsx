import React, { useState } from 'react'
import useCart from '../../hooks/useCart'
import {
  Box,
  Button,
  Skeleton,
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
  useMediaQuery,
  Stack,
  Avatar
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useCheckout from '../../hooks/useCheckout'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import PaymentsIcon from '@mui/icons-material/Payments'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ImageIcon from '@mui/icons-material/Image'

export default function Checkout() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { data, isLoading, isError, error } = useCart()
  const { mutate: checkOut, isPending } = useCheckout()
  const [paymentMethod, setPaymentMethod] = useState('')

  const handleCheckout = () => {
    if (!paymentMethod) {
      toast.warning(t('Please select a payment method.'))
      return
    }

    checkOut(
      { paymentMethod },
      {
        onSuccess: () => {
          toast.success(t('Order confirmed.'))
          navigate('/orderSuccess', { state: { paymentMethod } })
        },
        onError: (err) => {
          toast.error(t(err?.message || 'Checkout failed. Please try again.'))
        }
      }
    )
  }

  if (isLoading) {
    return (
      <Box sx={{ py: 6, px: { xs: 2, md: 4 }, maxWidth: '900px', mx: 'auto', minHeight: '80vh' }}>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 4 }} />
        <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 3, mb: 4 }} />
        <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 3 }} />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography color="error" variant="h6">
          {t(error?.message || 'Failed to load order data.')}
        </Typography>
      </Box>
    )
  }

  const items = data?.items || []
  const grandTotal = items.reduce((acc, item) => acc + (item.totalPrice || 0), 0)

  return (
    <Box component="section" sx={{ py: 6, px: { xs: 2, md: 4 }, maxWidth: '900px', mx: 'auto', minHeight: '80vh' }}>
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

        {isMobile ? (
          <Stack spacing={2}>
            {items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar
                    src={item.image || ''}
                    alt={item.productName}
                    variant="rounded"
                    sx={{ width: 44, height: 44, bgcolor: 'action.hover' }}
                  >
                    <ImageIcon color="action" />
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.productName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price} × {item.count}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                  ${item.totalPrice}
                </Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'action.hover' }}>
                  <TableCell sx={{ fontWeight: 600 }}>{t('Product Name')}</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>{t('Price')}</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>{t('Quantity')}</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>{t('Total')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          src={item.image || ''}
                          alt={item.productName}
                          variant="rounded"
                          sx={{ width: 40, height: 40, bgcolor: 'action.hover' }}
                        >
                          <ImageIcon color="action" />
                        </Avatar>
                        <Typography sx={{ fontWeight: 500 }}>{item.productName}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>${item.price}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{item.count}</TableCell>
                    <TableCell sx={{ textAlign: 'center', fontWeight: 600, color: theme.palette.primary.main }}>
                      ${item.totalPrice}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('Total')}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
            ${grandTotal}
          </Typography>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}`, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          {t('Payment Method')}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <Box
            onClick={() => setPaymentMethod('Cash')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 3,
              py: 2,
              minWidth: 160,
              borderRadius: 2,
              cursor: 'pointer',
              border: `1.5px solid ${paymentMethod === 'Cash' ? theme.palette.primary.main : theme.palette.divider}`,
              backgroundColor: paymentMethod === 'Cash' ? 'action.selected' : 'background.paper',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: 'action.hover'
              }
            }}
          >
            <PaymentsIcon sx={{ fontSize: 26, color: theme.palette.primary.main }} />
            <Typography variant="body1" sx={{ fontWeight: 600, flex: 1, color: paymentMethod === 'Cash' ? theme.palette.primary.main : 'text.primary' }}>
              {t('Cash')}
            </Typography>
            {paymentMethod === 'Cash' && (
              <CheckCircleIcon sx={{ fontSize: 20, color: theme.palette.primary.main }} />
            )}
          </Box>

          <Box
            onClick={() => setPaymentMethod('Visa')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 3,
              py: 2,
              minWidth: 160,
              borderRadius: 2,
              cursor: 'pointer',
              border: `1.5px solid ${paymentMethod === 'Visa' ? theme.palette.primary.main : theme.palette.divider}`,
              backgroundColor: paymentMethod === 'Visa' ? 'action.selected' : 'background.paper',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: 'action.hover'
              }
            }}
          >
            <CreditCardIcon sx={{ fontSize: 26, color: theme.palette.primary.main }} />
            <Typography variant="body1" sx={{ fontWeight: 600, flex: 1, color: paymentMethod === 'Visa' ? theme.palette.primary.main : 'text.primary' }}>
              {t('Visa')}
            </Typography>
            {paymentMethod === 'Visa' && (
              <CheckCircleIcon sx={{ fontSize: 20, color: theme.palette.primary.main }} />
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            disabled={isPending}
            sx={{ textTransform: 'none', borderRadius: 2, px: 3, py: 1.2 }}
          >
            {t('Back')}
          </Button>
          <Button
            variant="contained"
            disabled={!paymentMethod || isPending}
            onClick={handleCheckout}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 4,
              py: 1.2,
              minWidth: 130,
              fontWeight: 600
            }}
          >
            {t('Pay Now')}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}