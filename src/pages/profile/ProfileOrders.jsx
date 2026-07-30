import React from 'react'
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, CircularProgress, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useProfile from '../../hooks/useProfile'

export default function ProfileOrders() {
  const { t } = useTranslation()
  const theme = useTheme()

  const { data, isLoading, isError, error } = useProfile()

  if (isLoading) return <CircularProgress />
  if (isError) return <Typography color='error'>{error.message}</Typography>

  const profile = data?.response || data || {}
  const orders = profile.orders || []

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}>
        {t('Order History')}
      </Typography>

      {orders.length === 0 ? (
        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          {t('No orders yet.')}
        </Typography>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: { xs: 600, md: 'auto' } }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'action.hover' }}>
                <TableCell sx={{ fontWeight: 600 }}>{t('Order ID')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('Date')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('Amount')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('Status')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('Payment')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>
                    ${order.amountPaid}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status || '—'} 
                      size="small" 
                      color={order.status === 'Active' ? 'success' : 'default'}
                      sx={{ fontWeight: 500, fontSize: '0.75rem' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={order.paymentStatus || '—'} 
                      size="small" 
                      color={order.paymentStatus === 'paid' ? 'success' : order.paymentStatus === 'unpaid' ? 'error' : 'default'}
                      sx={{ fontWeight: 500, fontSize: '0.75rem' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  )
}