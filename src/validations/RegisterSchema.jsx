import * as yup from "yup"

export const registerSchema = yup.object({
        UserName: yup.string().required().min(3).max(20),
        FullName: yup.string().required().min(6).max(30),
        PhoneNumber: yup.string().required().matches(
      /^[0-9]$/,
      "Please enter a valid Phone Number",
    ),
        Email: yup.string().email().required() .matches(
      /^[A-Za-z0-9._]+@(gmail\.com|yahoo\.com|icloud\.com|outlook\.com|hotmail\.com)$/,
      "Please enter a valid Gmail, Yahoo, iCloud or Microsoft email address.",
    ),
        Password:yup.string().required(),
      })