import * as yup from "yup";

export const SchemaUserUpdate = yup.object().shape({
  name: yup.string().strict().typeError("campo name aceita somente letras "),
  email: yup.string().email("E-mail invalido"),
  password: yup.string(),
});
