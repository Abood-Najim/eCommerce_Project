import * as yup from "yup";

const updateProfileSchema = yup.object({
  fullName: yup.string()
    .required("Full Name is required")
    .min(6, "Full Name must be at least 6 characters"),
  phoneNumber: yup.string()
    .required("Phone number is required")
    .matches(/^[0-9+]{10,15}$/, "Phone number must contain between 10 and 15 digits"),
});

export  default updateProfileSchema;
