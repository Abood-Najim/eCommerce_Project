import * as yup from "yup"

export const loginSchema = yup.object({
        Email: yup.string().email().required(),
        Password:yup.string().required(),
      })