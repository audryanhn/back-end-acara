import * as Yup from "yup";

export const registerValidateSchema = Yup.object({
  fullName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string()
    .required()
    .min(8, "Password Contains at least 8 characters")
    .test(
      "at-least-one-uppercase",
      "Password Contains at least one Uppercase",
      (value) => {
        if (!value) return false;
        const regex = /^(?=.*[A-Z])/;
        return regex.test(value);
      },
    )
    .test(
      "at-least-one-number",
      "Password Contains at least one number",
      (value) => {
        if (!value) return false;
        const regex = /^(?=.*\d)/;
        return regex.test(value);
      },
    ),
  confirmPassword: Yup.string()
    .required("Please fill the Confirmation Password")
    .oneOf([Yup.ref("password"), ""], "password not match"),
});
