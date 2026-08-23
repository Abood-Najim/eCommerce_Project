import * as yup from "yup";

const registerSchema = yup.object({
  UserName: yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  FullName: yup.string()
    .required("Full Name is required")
    .min(6, "Full Name must be at least 6 characters"),
  PhoneNumber: yup.string()
    .required("Phone number is required")
    .matches(/^[0-9+]{10,15}$/, "Phone number must contain between 10 and 15 digits"),
  Email: yup.string().email().required().matches(
      /^[A-Za-z0-9._%+-]+@(gmail\.com|yahoo\.com|icloud\.com|outlook\.com|hotmail\.com)$/i,
      "Please enter a valid Gmail, Yahoo, iCloud or Microsoft email address.",
    ),
  Password: yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default registerSchema;