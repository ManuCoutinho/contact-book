import * as yup from 'yup'

//validates the base format of an email
const EMAIL_VALIDATION =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('errors.invalid-format')
    .required('Campo obrigatório')
    .matches(EMAIL_VALIDATION, 'Formato inválido')
    .nonNullable('Campo obrigatório'),
  password: yup
    .string()
    .nonNullable('Campo obrigatório')
    .required('Campo obrigatório')
})

export type LoginForm = yup.InferType<typeof loginSchema>
