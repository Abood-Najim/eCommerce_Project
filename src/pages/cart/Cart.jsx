import axios from 'axios'
import React, { useEffect } from 'react'
import authAxiosInstance from '../../api/authAxiosInstance';
import useAuthStore from '../../store/useAuthStore';
import useCart from '../../hooks/useCart';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';



export default function Cart() {

  const { data, isLoading, isError, error } = useCart();

  if (isLoading) return <CircularProgress />
  if (isError) return <Typography color='red'>{error.message}</Typography>
  console.log(data);
  return (
    <Box component="section">
      <Typography variant='h1'>Cart</Typography>
      <TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Product Name</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Quantity</TableCell>
        <TableCell>Total</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {data.items.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.productName}</TableCell>
          <TableCell>{item.price}$</TableCell>
          <TableCell>{item.count}</TableCell>
          <TableCell>{item.totalPrice}$</TableCell>
          <TableCell></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
    </Box>
  )
}/* we use state manegmaent when ever we want something to be changed on all the pages that we added the state to it */
