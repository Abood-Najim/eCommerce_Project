import { useQuery } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance'

export default function useProfile() {
  const getProfile = async () => {
    const response = await authAxiosInstance.get('/Profile')
    return response.data
  }

  const query = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5
  })

  return query
}