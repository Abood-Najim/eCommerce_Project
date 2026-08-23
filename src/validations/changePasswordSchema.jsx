import * as yup from "yup";

const changePasswordSchema =yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup.string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmNewPassword: yup.string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});
export default changePasswordSchema;