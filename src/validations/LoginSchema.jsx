import * as yup from "yup"

const loginSchema = yup.object({
        Email: yup.string().email().required().matches(
      /^[A-Za-z0-9._%+-]+@(gmail\.com|yahoo\.com|icloud\.com|outlook\.com|hotmail\.com)$/i,
      "Please enter a valid Gmail, Yahoo, iCloud or Microsoft email address." ),
        Password: yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
      });

export default loginSchema;