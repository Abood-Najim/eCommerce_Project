import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import i18n from '../i18next';

export default function useSearch(searchTerm) {
  const getSearchResults = async () => {
    if (!searchTerm || searchTerm.trim() === '') return { response: { data: [] } };
    const response = await axiosInstance.get(`/Products?search=${encodeURIComponent(searchTerm)}`);
    return response.data;
  }

  const query = useQuery(
    {
      queryKey: ['search', i18n.language, searchTerm],
      queryFn: getSearchResults,
      enabled: !!searchTerm && searchTerm.trim() !== '', 
      staleTime: 1000 * 60 * 5
    }
  )
  return query;
}