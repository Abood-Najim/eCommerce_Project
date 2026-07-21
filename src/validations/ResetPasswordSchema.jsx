import * as yup from "yup";

const ResetPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Email must be a valid email.")
    .required("Email is required.")
    .matches(
      /^[A-Za-z0-9._]+@(gmail\.com|yahoo\.com|icloud\.com|outlook\.com|hotmail\.com)$/,
      "Please enter a valid Gmail, Yahoo, iCloud or Microsoft email address.",
    )
});   

export default ResetPasswordSchema;