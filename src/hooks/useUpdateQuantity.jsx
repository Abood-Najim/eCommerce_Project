import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import authAxiosInstance from '../api/authAxiosInstance';

export default function useUpdateQuantity() {
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn:async({productId,count})=>{
      await authAxiosInstance.patch(`/Carts/${productId}`,{count})
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:['cart']
      })
  }
})
}
