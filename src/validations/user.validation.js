import * as yup from "yup";

const adminSchema = yup.object({
  email: yup
    .string()
    .email("Please write a vaild email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 chars")
    .required("Password is required"),
});

export { adminSchema };
