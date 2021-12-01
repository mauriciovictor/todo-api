import * as yup from "yup";

export const SchemaUserCreate = yup.object().shape({
  name: yup
    .string()
    .strict()
    .typeError("campo name aceita somente letras ")
    .required("Nome é obrigatorio"),
  email: yup.string().email("E-mail invalido").required("E-mail é obrigatorio"),
  password: yup.string().required("senha é obrigatorio"),
});
