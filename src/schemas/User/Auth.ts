import * as yup from "yup";

export const SchemaUserAuth = yup.object().shape({
  email: yup
    .string()
    .strict()
    .typeError("somente numeros")
    .email("E-mail invalido")
    .required("E-mail é obrigatorio"),

  password: yup.string().required("senha é obrigatorio"),
});
