import * as yup from "yup"

export const registerSchema = yup.object({
        UserName: yup.string().required().min(3).max(20),
        FullName: yup.string().required().min(5).max(30),
        PhoneNumber: yup.string().required(),
        Email: yup.string().email().required(),
        Password:yup.string().required(),
      })