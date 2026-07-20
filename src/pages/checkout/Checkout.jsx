import React, { useState } from 'react'
import useCart from '../../hooks/useCart'
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useCheckout from '../../hooks/useCheckout';

export default function Checkout() {

  const { t } = useTranslation();
  const { data, isLoading, isError, error } = useCart();
  const {mutate:checkOut} = useCheckout();
  const [paymentMethod,setPaymentMethod] = useState('');









  if (isLoading) return <CircularProgress />
  if (isError) return <Typography color='red'>{error.message}</Typography>
  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('Product Name')}</TableCell>
              <TableCell>{t('Price')}</TableCell>
              <TableCell>{t('Quantity')}</TableCell>
              <TableCell>{t('Total')}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.price}$</TableCell>
                <TableCell>{item.totalPrice}$</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t('Payment Method')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={paymentMethod}
          label="Payment"
          onChange={(e)=>setPaymentMethod(e.target.value)}
        >
          <MenuItem value={'Cash'}>{t('Cash')}</MenuItem>
          <MenuItem value={'Visa'}>{t('Visa')}</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={()=>checkOut({paymentMethod})}>{t('Pay Now')}</Button>
    </Box>
  )
}
