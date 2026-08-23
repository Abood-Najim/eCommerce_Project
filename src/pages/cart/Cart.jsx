import React, { useEffect, useState } from 'react'
import useAuthStore from '../../store/useAuthStore'
import useLoginPromptStore from '../../store/useLoginPromptStore'
import useCart from '../../hooks/useCart'
import Typography from '@mui/material/Typography'
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
  Stack,
  Skeleton,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  Fade,
  Slide,
  Grow
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import useRemoveFromCart from '../../hooks/useRemoveFromCart'
import useUpdateQuantity from '../../hooks/useUpdateQuantity'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import useClearCart from '../../hooks/useClearCart'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import ImageIcon from '@mui/icons-material/Image'

export default function Cart() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { data, isLoading, isError, error } = useCart()
  const { mutate: removeItem, isPending } = useRemoveFromCart()
  const { mutate: updateQuantity, isPending: updateQuantityPend } = useUpdateQuantity()
  const { mutate: clearCart, isPending: clearCartPend } = useClearCart()
  const { t } = useTranslation()
  const token = useAuthStore((state) => state.token)
  const openLoginPrompt = useLoginPromptStore((state) => state.openLoginPrompt)

  const [clearDialogOpen, setClearDialogOpen] = useState(false)

  const handleUpdate = (productId, action) => {
    const item = data?.items?.find((i) => i.productId == productId)
    if (!item) return

    if (action === '+') {
      updateQuantity(
        { productId, count: item.count + 1 },
        {
          onSuccess: () => toast.success(t('Quantity updated successfully')),
          onError: (err) => toast.error(t(err?.message || 'Failed to update quantity'))
        }
      )
    } else {
      if (item.count === 1) {
        handleRemove(productId)
      } else {
        updateQuantity(
          { productId, count: item.count - 1 },
          {
            onSuccess: () => toast.success(t('Quantity updated successfully')),
            onError: (err) => toast.error(t(err?.message || 'Failed to update quantity'))
          }
        )
      }
    }
  }

  const handleRemove = (productId) => {
    removeItem(productId, {
      onSuccess: () => toast.success(t('Item removed from cart')),
      onError: (err) => toast.error(t(err?.message || 'Failed to remove item'))
    })
  }

  const handleConfirmClearCart = () => {
    clearCart(undefined, {
      onSuccess: () => {
        toast.success(t('Cart cleared successfully'))
        setClearDialogOpen(false)
      },
      onError: (err) => {
        toast.error(t(err?.message || 'Failed to clear cart'))
        setClearDialogOpen(false)
      }
    })
  }

  useEffect(() => {
    if (isError) {
      toast.error(t(error?.message || 'Failed to load cart.'))
    }
  }, [isError, error, t])

  useEffect(() => {
    if (!data || !data.items) return
    const itemCounter = data.items
      .filter((item) => item.count === 0)
      .map((item) => item.productId)
    if (itemCounter.length > 0) {
      removeItem(itemCounter)
    }
  }, [data, removeItem])

  const handleCheckout = () => {
    if (!token) {
      openLoginPrompt()
      return
    }
    navigate('/checkout')
  }

  if (isLoading) {
    return (
      <Box component="section" sx={{ py: 6, px: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto', minHeight: '80vh' }}>
        <Skeleton variant="text" width={180} height={40} sx={{ mb: 4 }} />
        <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 3, mb: 4 }} />
        <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 3 }} />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography color="error" variant="h6">
          {t(error?.message || 'Failed to load cart.')}
        </Typography>
      </Box>
    )
  }

  const items = data?.items || []
  const subtotal = items.reduce((acc, item) => acc + (item.totalPrice || 0), 0)

  return (
    <Box component="section" sx={{ py: 6, px: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto', minHeight: '80vh' }}>
      <Fade in timeout={600}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.5px' }}>
              {t('Cart')}
            </Typography>
          </Box>

          {items.length > 0 && (
            <Button
              disabled={clearCartPend}
              onClick={() => setClearDialogOpen(true)}
              variant="outlined"
              color="error"
              size="small"
              sx={{ textTransform: 'none', borderRadius: 2, px: 2 }}
            >
              {t('Clear Cart')}
            </Button>
          )}
        </Box>
      </Fade>

      {items.length === 0 ? (
        <Fade in timeout={800}>
          <Paper elevation={0} sx={{ p: 6, textAlign: 'center', border: `1px solid ${theme.palette.divider}`, borderRadius: 3 }}>
            <Grow in timeout={1000}>
              <Box>
                <ShoppingBagOutlinedIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  {t('Your cart is empty')}
                </Typography>
                <Button variant="contained" onClick={() => navigate('/products')} sx={{ textTransform: 'none', borderRadius: 2 }}>
                  {t('Continue Shopping')}
                </Button>
              </Box>
            </Grow>
          </Paper>
        </Fade>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1, width: '100%' }}>
            {isMobile ? (
              <Stack spacing={2}>
                {items.map((item, index) => (
                  <Slide direction="up" in timeout={400 + index * 100} key={item.id}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          src={item.image || ''}
                          alt={item.productName}
                          variant="rounded"
                          sx={{ width: 56, height: 56, bgcolor: 'action.hover' }}
                        >
                          <ImageIcon color="action" />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontWeight: 600 }}>{item.productName}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            ${item.price} {t('each')}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/product/${item.productId}`)}
                          sx={{ color: 'primary.main' }}
                        >
                          <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Divider />

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            disabled={updateQuantityPend || isPending}
                            onClick={() => handleUpdate(item.productId, '-')}
                            sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 1.5 }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ minWidth: 28, textAlign: 'center', fontWeight: 600 }}>
                            {item.count}
                          </Typography>
                          <IconButton
                            size="small"
                            disabled={updateQuantityPend}
                            onClick={() => handleUpdate(item.productId, '+')}
                            sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 1.5 }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          ${item.totalPrice}
                        </Typography>

                        <IconButton
                          color="error"
                          disabled={isPending}
                          onClick={() => handleRemove(item.productId)}
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Paper>
                  </Slide>
                ))}
              </Stack>
            ) : (
              <Fade in timeout={600}>
                <TableContainer component={Paper} elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: 'action.hover' }}>
                        <TableCell sx={{ fontWeight: 600 }}>{t('Product Name')}</TableCell>
                        <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>{t('Price')}</TableCell>
                        <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>{t('Quantity')}</TableCell>
                        <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>{t('Total')}</TableCell>
                        <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>{t('Actions')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((item, index) => (
                        <Fade in timeout={500 + index * 100} key={item.id}>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar
                                  src={item.image || ''}
                                  alt={item.productName}
                                  variant="rounded"
                                  sx={{ width: 48, height: 48, bgcolor: 'action.hover' }}
                                >
                                  <ImageIcon color="action" />
                                </Avatar>
                                <Typography sx={{ fontWeight: 500 }}>{item.productName}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>${item.price}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                <IconButton
                                  size="small"
                                  disabled={updateQuantityPend || isPending}
                                  onClick={() => handleUpdate(item.productId, '-')}
                                  sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 1.5 }}
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography sx={{ minWidth: 28, textAlign: 'center', fontWeight: 600 }}>
                                  {item.count}
                                </Typography>
                                <IconButton
                                  size="small"
                                  disabled={updateQuantityPend}
                                  onClick={() => handleUpdate(item.productId, '+')}
                                  sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 1.5 }}
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 600, color: 'primary.main' }}>
                              ${item.totalPrice}
                            </TableCell>
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
                                  onClick={() => handleRemove(item.productId)}
                                  size="small"
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        </Fade>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Fade>
            )}
          </Box>

          <Slide direction="left" in timeout={800}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                width: { xs: '100%', lg: '340px' },
                position: { lg: 'sticky' },
                top: { lg: '24px' },
                height: 'fit-content',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
                backgroundColor: 'background.paper'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                {t('Order Summary')}
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography color="text.secondary">{t('Subtotal')}</Typography>
                <Typography sx={{ fontWeight: 600 }}>${subtotal}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {t('Total')}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  ${subtotal}
                </Typography>
              </Box>

              <Stack spacing={1.5}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleCheckout}
                  sx={{ textTransform: 'none', borderRadius: 2, py: 1.2, fontWeight: 600 }}
                >
                  {t('Proceed To Checkout')}
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/products')}
                  sx={{ textTransform: 'none', borderRadius: 2, py: 1.2 }}
                >
                  {t('Continue Shopping')}
                </Button>
              </Stack>
            </Paper>
          </Slide>
        </Box>
      )}

      <Dialog
        open={clearDialogOpen}
        onClose={() => setClearDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <Fade in={clearDialogOpen} timeout={300}>
          <Box>
            <DialogTitle sx={{ fontWeight: 600 }}>{t('Clear Cart?')}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t('Are you sure you want to remove all items from your cart? This action cannot be undone.')}
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button
                onClick={() => setClearDialogOpen(false)}
                sx={{ textTransform: 'none', borderRadius: 2 }}
              >
                {t('Cancel')}
              </Button>
              <Button
                onClick={handleConfirmClearCart}
                color="error"
                variant="contained"
                disabled={clearCartPend}
                sx={{ textTransform: 'none', borderRadius: 2 }}
              >
                {t('Clear Cart')}
              </Button>
            </DialogActions>
          </Box>
        </Fade>
      </Dialog>
    </Box>
  )
}