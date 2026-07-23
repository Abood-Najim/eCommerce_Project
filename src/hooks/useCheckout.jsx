import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import authAxiosInstance from '../api/authAxiosInstance'

export default function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ paymentMethod }) =>
      await authAxiosInstance.post('/Checkouts', { paymentMethod }),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });

      if (variables.paymentMethod === 'Cash') {
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      } 
      else if (response?.data?.url) {
        location.href = response.data.url;
      }
    }
  })
}