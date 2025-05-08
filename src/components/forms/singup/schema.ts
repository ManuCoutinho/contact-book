import * as yup from 'yup'

//validates the base format of an email
const EMAIL_VALIDATION = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('errors.invalid-format')
    .required('Campo obrigatório')
    .matches(EMAIL_VALIDATION, 'Formato inválido')
    .nonNullable('Campo obrigatório'),
  password: yup.string().nonNullable('Campo obrigatório').required('Campo obrigatório').min(8, 'Min. 8 caracteres'),
  passwordConfirmation: yup.string().nonNullable('Campo obrigatório').required('Campo obrigatório').oneOf([yup.ref('password'), ''], 'Senhas não são iguais'),
})

export type RegisterForm = yup.InferType<typeof registerSchema>