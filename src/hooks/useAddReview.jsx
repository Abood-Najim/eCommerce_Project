import { useMutation, useQueryClient } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance'

export default function useAddReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ productId, rating, comment }) => {
      const response = await authAxiosInstance.post(`/Products/${productId}/reviews`, {
        Rating: rating,
        Comment: comment
      })
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['product', variables.productId] })
    }
  })
}