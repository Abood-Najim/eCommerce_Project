import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../api/axiosInstance'

export default function useResetPassword() {
  return useMutation({
    mutationFn: async ({ email, code, newPassword }) => {
      const response = await axiosInstance.patch('/auth/Account/ResetPassword', {
        code,
        newPassword,
        email
      })
      return response.data
    }
  })
}