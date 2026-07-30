import { useMutation, useQueryClient } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance'

export default function useUpdateEmail() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ newEmail }) => {
      const response = await authAxiosInstance.patch('/Profile/change-email', {
        NewEmail: newEmail
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })
}