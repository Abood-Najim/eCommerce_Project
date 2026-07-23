import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import i18n from '../i18next';

export default function useProducts(page = 1, limit = 8, sortBy = 'price', ascending = false) {
  const getProducts = async() => {
    const response = await axiosInstance.get(`/Products`, {
      params: {
        page,
        limit,
        sortBy,
        ascending
      }
    });
    return response.data;
  }

  const query = useQuery(
    {
      queryKey: ['products', i18n.language, page, limit, sortBy, ascending],
      queryFn: getProducts,
      staleTime: 1000 * 60 * 5
    }
  )
  return query;
}