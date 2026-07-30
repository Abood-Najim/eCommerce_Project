import { useMutation } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance'

export default function useChangePassword() {
  return useMutation({
    mutationFn: async ({ currentPassword, newPassword, confirmNewPassword }) => {
      const response = await authAxiosInstance.patch('/Profile/change-password', {
        CurrentPassword: currentPassword,
        NewPassword: newPassword,
        ConfirmNewPassword: confirmNewPassword
      })
      return response.data
    }
  })
}