import React from 'react'
import {
  Box, Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, CircularProgress, useTheme, Divider,
  Fade, Grow, Slide
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import useProfile from '../../hooks/useProfile'

export default function ProfileOrders() {
  const { t } = useTranslation()
  const theme = useTheme()

  const { data, isLoading, isError, error } = useProfile()

  if (isLoading) {
    return (
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Paper>
    )
  }

  if (isError) {
    return (
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
        <Typography color="error" align="center">{error?.message ? t(error.message) : t('An error occurred')}</Typography>
      </Paper>
    )
  }

  const profile = data?.response || data || {}
  const orders = profile.orders || []

  return (
    <Fade in timeout={600}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: 'background.paper',
          boxShadow: theme.palette.mode === 'dark' ? '0px 10px 30px rgba(0,0,0,0.3)' : '0px 10px 30px rgba(0,0,0,0.03)'
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}>
          {t('Order History')}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {orders.length === 0 ? (
          <Grow in timeout={600}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <ShoppingBagOutlinedIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.4, mb: 1.5 }} />
              <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
                {t('No orders yet.')}
              </Typography>
            </Box>
          </Grow>
        ) : (
          <Fade in timeout={800}>
            <TableContainer sx={{ borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
              <Table sx={{ minWidth: { xs: 600, md: 'auto' } }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'action.hover' : 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600 }}>{t('Order ID')}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{t('Date')}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{t('Amount')}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{t('Status')}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{t('Payment')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order, index) => (
                    <Fade in timeout={400 + index * 100} key={order.id}>
                      <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>#{order.id}</TableCell>
                        <TableCell>
                          {new Date(order.orderDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>
                          ${order.amountPaid}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={order.status ? t(order.status) : '—'}
                            size="small"
                            color={order.status === 'Active' ? 'success' : 'default'}
                            sx={{ fontWeight: 500, fontSize: '0.75rem' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={order.paymentStatus ? t(order.paymentStatus) : '—'}
                            size="small"
                            color={order.paymentStatus === 'paid' ? 'success' : order.paymentStatus === 'unpaid' ? 'error' : 'default'}
                            sx={{ fontWeight: 500, fontSize: '0.75rem' }}
                          />
                        </TableCell>
                      </TableRow>
                    </Fade>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Fade>
        )}
      </Paper>
    </Fade>
  )
}