import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import authAxiosInstance from '../api/authAxiosInstance';

export default function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:(cartItemId)=> authAxiosInstance.delete(`/Carts/${cartItemId}`),
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:['cart']
      })
    }
  })
}
