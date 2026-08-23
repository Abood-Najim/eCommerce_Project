import * as yup from "yup";

const updateEmailSchema = yup.object({
  newEmail: yup.string()
    .required("Email address is required")
    .email("Invalid email format")
    .matches(
      /^[A-Za-z0-9._%+-]+@(gmail\.com|yahoo\.com|icloud\.com|outlook\.com|hotmail\.com)$/i,
      "Please enter a valid Gmail, Yahoo, iCloud or Microsoft email address."
    ),
});

export default updateEmailSchema;