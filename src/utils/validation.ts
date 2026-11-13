import * as Yup from "yup";

export const registerValidateSchema = Yup.object({
  fullName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required("Please fill the Confirmation Password")
    .oneOf([Yup.ref("password"), ""], "password not match"),
});
