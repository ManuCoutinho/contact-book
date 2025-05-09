import { useCallback, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { searchAddress, getGeoLocation } from '@/services'
import { type ContactForm, contactSchema } from '../schema'

export function useCreateContact() {
  const {
    control,
    register,
    setError,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ContactForm>({
    resolver: yupResolver(contactSchema),
    mode: 'onBlur',
    criteriaMode: 'firstError'
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
                  const fullAddress = `${address.logradouro}, ${address.bairro}, ${address.localidade} - ${address.uf}, Brasil`;
                  const location = await getGeoLocation(fullAddress)
                  console.log('📍', location)
                  setLocation(location)
                }
              }
            }
            )
            .catch((error) => console.error(error))

        }
      }
    },
    [setError, clearErrors, setValue]
  )

  const onCreateContact: SubmitHandler<ContactForm> = async (data) => {
    console.log('🦩', data)
  }

  const onSubmit = handleSubmit(onCreateContact)
  return {
    register,
    control,
    errors,
    isSubmitting,
    hasError,
    isDisabled,
    cepCallback,
    onSubmit
  }
}
