import axios from 'axios'
import React, { useEffect } from 'react'
import authAxiosInstance from '../../api/authAxiosInstance';
import useAuthStore from '../../store/useAuthStore';
import useCart from '../../hooks/useCart';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useRemoveFromCart from '../../hooks/useRemoveFromCart';
import useUpdateQuantity from '../../hooks/useUpdateQuantity';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import useClearCart from '../../hooks/useClearCart';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

const navigate = useNavigate();
  const { data, isLoading, isError, error } = useCart();
  const { mutate: removeItem, isPending } = useRemoveFromCart();
  const { mutate: updateQuantity, isPending: updateQuantityPend } = useUpdateQuantity();
  const { mutate: clearCart, isPending: clearCartPend } = useClearCart();
  const {t} = useTranslation();

  const handleUpdate = (productId,action)=>{
    const item = data.items.find(i=>i.productId == productId);
    if(action == '+'){
      updateQuantity({productId,count:item.count+1});
    }else{
      updateQuantity({productId,count:item.count-1});
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
    <Box component="section">
      <Typography variant='h1'>{t('Cart')}</Typography>
      <Button disabled={clearCartPend} onClick={clearCart}>
        <Typography variant='h5'>{t('Clear Cart')}</Typography>
        </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('Product Name')}</TableCell>
              <TableCell>{t('Price')}</TableCell>
              <TableCell>{t('Quantity')}</TableCell>
              <TableCell>{t('Total')}</TableCell>
              <TableCell>{t('Actions')}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.price}$</TableCell>
                <TableCell>
                  <Box sx={{display:'flex',alignItems:'center'}}>
                    <IconButton>
                      <RemoveIcon disabled={updateQuantityPend} onClick={()=>handleUpdate(item.productId,'-')}/>
                    </IconButton>
                    <Typography>{item.count}</Typography>
                    <IconButton>
                      <AddIcon disabled={updateQuantityPend} onClick={()=>handleUpdate(item.productId,'+')} />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>{item.totalPrice}$</TableCell>
                <TableCell><Button color='error' disabled={isPending} onClick={() => removeItem(item.productId)}><DeleteIcon /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        <Button onClick={()=>navigate('/checkout')}>{t('Proceed To Checkout')}</Button>
        <Button onClick={()=>navigate('/')}>{t('Continue Shopping')}</Button>
      </Box>
    </Box>
  )
}



/* we use state manegmaent when ever we want something to be changed on all the pages that we added the state to it */
