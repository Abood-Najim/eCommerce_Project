import React from 'react'
import axiosInstance from '../api/axiosInstance'
import { useQuery } from '@tanstack/react-query';

export default function useProduct(id) {

  const getProduct = async () => {
    const response = await axiosInstance.get(`/Products/${id}`)
    return response.data;
  }

  const query = useQuery({
    queryKey: ['product','en',id],
    queryFn: getProduct,
    staleTime: 1000 * 60 * 5
  });

  return query;
}
