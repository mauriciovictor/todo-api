import { AnySchema } from "yup";
import { string } from "yup/lib/locale";

interface ErrorsInner {
  value: string | undefined;
  path: string;
  errors: string[];
}

interface Errors {
  value: string | undefined;
  field: string;
  errors: string[];
}

export const ValidationSchema = async (Schema: AnySchema, data: any) => {
  const errors = [] as Errors[];

  await Schema.validate(data, { abortEarly: false }).catch((error) => {
    const inputErrors = error.inner as ErrorsInner[];

    inputErrors.map((input) => {
      errors.push({
        field: input.path,
        value: input.value,
        errors: input.errors,
      });
    });
  });

  return errors;
};
