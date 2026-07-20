import * as yup from "yup"

export const loginSchema = yup.object({
        Email: yup.string().email().required() .matches(
      /^[A-Za-z0-9._]+@(gmail\.com|yahoo\.com|icloud\.com|outlook\.com|hotmail\.com)$/,
      "Please enter a valid Gmail, Yahoo, iCloud or Microsoft email address." ),
        Password:yup.string().required(),
      })