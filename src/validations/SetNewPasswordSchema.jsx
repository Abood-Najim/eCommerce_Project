import * as yup from "yup"

const setNewPasswordSchema = yup.object({
  newPassword: yup.string().min(6).required(),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], "Passwords must match").required()
});
export default setNewPasswordSchema;