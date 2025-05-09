import { useCallback, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContact } from '@/hooks/useContact'
import {
  searchAddress,
  getGeoLocation,
  createContact,
  updateContact
} from '@/services'
import { type ContactForm, contactSchema } from '../schema'
import setUrlParams from '@/utils/set-url-params'
import deleteUrlParam from '@/utils/delete-url-param'

export function useCreateContact() {
  const { contact } = useContact()

  const defaultValues =
    contact != null
      ? {
        name: contact.name,
        phone: contact.phone,
        cpf: contact.cpf,
        street: contact.address.street,
        number: contact.address.number,
        city: contact.address.city,
        state: contact.address.state,
        country: 'Brasil',
        cep: contact.address.cep,
        neighborhood: contact.address.neighborhood,
        complement: contact.address.complement ?? '',
        location: contact.address.location
      }
      : { complement: '' }

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: ''
  })
  const {
    control,
    register,
    setError,
    setValue,
    clearErrors,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ContactForm>({
    resolver: yupResolver(contactSchema),
    mode: 'onBlur',
    criteriaMode: 'firstError',
    defaultValues
  })
  const [location, setLocation] = useState<string | null>(null)
  const hasError = Object.keys(errors).length > 0
  const isDisabled = isSubmitting || hasError

  const cepCallback = useCallback(
    async (value: string | null) => {
      if (value) {
        const digits = value.replace(/\D/g, '')
        if (digits.length === 8) {
          searchAddress(value)
            .then(async (address) => {
              if (address) {
                if (Object.hasOwn(address, 'erro')) {
                  setError(
                    'cep',
                    { message: 'Formato inválido', type: 'pattern' },
                    { shouldFocus: true }
                  )
                } else {
                  clearErrors('cep')
                  setValue('street', address.logradouro)
                  setValue('neighborhood', address.bairro)
                  setValue('state', address.estado)
                  setValue('city', address.localidade)
                  setValue('country', 'Brasil')
                  setValue('complement', address.complemento)
                  const fullAddress = `${address.logradouro}, ${address.bairro}, ${address.localidade} - ${address.uf}, Brasil`
                  const location = await getGeoLocation(fullAddress)

                  setUrlParams([{ key: 'location', value: location }])
                  setLocation(location)
                }
              }
            })
            .catch((error) => console.error(error))
        }
      }
    },
    [setError, clearErrors, setValue]
  )

  const onHandleContact: SubmitHandler<ContactForm> = async (data) => {
    if (!contact && location) {
      createContact(data, location, '1')
        .then(() => {
          reset()
          setToast({
            message: 'Contato criado com sucesso!',
            open: true,
            severity: 'success'
          })
          setTimeout(
            () => setUrlParams([{ key: 'mode', value: 'view' }]),
            4500
          )
        })
        .catch(() => {
          setToast({
            message: 'Ocorreu um error ao criar o contato',
            open: true,
            severity: 'error'
          })
        })
    }
    if (contact) {
      const currentLoc = location ?? contact?.address.location
      updateContact(data, currentLoc, contact.user.id, contact.id)
        .then(() => {
          reset()
          setToast({
            message: 'Contato atualizado com sucesso!',
            open: true,
            severity: 'success'
          })
          setTimeout(
            () => {
              deleteUrlParam(['contact'])
              setUrlParams([{ key: 'mode', value: 'view' }])
            },
            4500
          )
        })
        .catch(() => {
          setToast({
            message: 'Ocorreu um error ao atualizar o contato',
            open: true,
            severity: 'error'
          })
        })
    }

  }

  function handleCloseToast() {
    setToast((prev) => ({ ...prev, message: '', open: false }))
  }

  const onSubmit = handleSubmit(onHandleContact)

  return {
    register,
    control,
    errors,
    isSubmitting,
    hasError,
    isDisabled,
    cepCallback,
    onSubmit,
    toast,
    handleCloseToast
  }
}
