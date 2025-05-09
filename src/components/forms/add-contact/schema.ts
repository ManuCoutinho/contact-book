import * as yup from 'yup'
import phoneIsValid from '@/utils/phone-validation'
import cpfIsValid from '@/utils/cpf-validation'

const requiredMessage = 'Campo obrigatório'
const invalidFormatMessage = 'Formato inválido'

export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Min. 3 caracteres')
    .required(requiredMessage)
    .nonNullable(requiredMessage)
    .matches(/^[a-zA-ZÀ-ú'-\.\s]+$/, invalidFormatMessage)
    .test(
      'name',
      'Informe o sobrenome',
      (value) =>
        value.split(' ')[1] != null &&
        value.split(' ')[1] !== '' &&
        value.split(' ')[1].length >= 2
    ),
  phone: yup
    .string()
    .min(11, invalidFormatMessage)
    .required(requiredMessage)
    .nonNullable(requiredMessage)
    .test('phone', invalidFormatMessage, (value) => phoneIsValid(value)),
  cpf: yup
    .string()
    .min(11, invalidFormatMessage)
    .test('cpf', 'CPF inválido', (value) => cpfIsValid(value))
    .required(requiredMessage)
    .nonNullable(requiredMessage),
  cep: yup
    .string()
    .required(requiredMessage)
    .min(8, invalidFormatMessage)
    .nonNullable(requiredMessage),
  country: yup
    .string()
    .required(requiredMessage)
    .nonNullable(requiredMessage),
  street: yup
    .string()
    .required(requiredMessage)
    .nonNullable(requiredMessage),
  neighborhood: yup
    .string()
    .required(requiredMessage)
    .nonNullable(requiredMessage),
  city: yup.string().required(requiredMessage).nonNullable(requiredMessage),
  state: yup
    .string()
    .required(requiredMessage)
    .nonNullable(requiredMessage),
  number: yup
    .string()
    .required(requiredMessage)
    .nonNullable(requiredMessage)
})

export type ContactForm = {
  name: string
  phone: string
  cpf: string
  cep: string
  country: string
  street: string
  neighborhood: string
  city: string
  state: string
  number: string
  complement?: yup.Maybe<string | undefined>
}

//export type ContactForm = yup.InferType<typeof contactSchema>