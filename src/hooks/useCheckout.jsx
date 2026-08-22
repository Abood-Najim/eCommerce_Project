import { useMutation, useQueryClient } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance'

export default function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ paymentMethod }) =>
      await authAxiosInstance.post('/Checkouts', { paymentMethod }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });

      if (response?.data?.url) {
        window.location.href = response.data.url;
      }
    }
  })
}