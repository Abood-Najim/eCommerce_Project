import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import authAxiosInstance from '../api/authAxiosInstance';

export default function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:()=> authAxiosInstance.delete(`/Carts/clear`),
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:['cart']
      })
    }
  })
}

