import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import i18n from '../i18next';

export default function useProductsByCategory(categoryId) {
  const getProductsByCategory = async () => {
    const response = await axiosInstance.get(`/Products/category/${categoryId}`);
    return response.data; 
  }

  const query = useQuery({
    queryKey: ['products-by-category', i18n.language, categoryId],
    queryFn: getProductsByCategory,
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5
  })

  return query;
}