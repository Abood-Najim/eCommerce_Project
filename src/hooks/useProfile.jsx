import { useQuery } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance'
import i18n from '../i18next'

export default function useProfile() {
  const getProfile = async () => {
    const response = await authAxiosInstance.get('/Profile')
    return response.data
  }

  const query = useQuery({
    queryKey: ['profile', i18n.language],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5
  })

  return query
}