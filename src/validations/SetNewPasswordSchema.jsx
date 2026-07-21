import * as yup from "yup"

export const setNewPasswordSchema = yup.object({
  newPassword: yup.string().min(6).required(),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], "Passwords must match").required()
})