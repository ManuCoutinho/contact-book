'use client'
import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useCreateContact } from './hooks/useCreateContact'
import setUrlParams from '@/utils/set-url-params'
import cepMask from '@/utils/cep-mask'
import Toast from '@/components/toast'
import deleteUrlParam from '@/utils/delete-url-param'
import { useContact } from '@/hooks/useContact'
import { useSearchParams } from 'next/navigation'

export default function AddContactForm() {
  const { setContact } = useContact()
  const {
    control,
    register,
    errors,
    isDisabled,
    isSubmitting,
    cepCallback,
    onSubmit,
    handleCloseToast,
    toast
  } = useCreateContact()
  const params = useSearchParams()
  const mode = params.get('mode')
  function handleUpdateMode() {
    setContact(null)
    deleteUrlParam(['location'])
    setUrlParams([{ key: 'mode', value: 'view' }])
  }
  return (
    <Grid
      size={7}
      className='size-full flex flex-col gap-6'
      component='form'
      id='form-add-contact'
      aria-label='form-add-contact'
      method='POST'
      onSubmit={onSubmit}
    >
      <Toast {...toast} handleClose={handleCloseToast} />
      <Typography variant='h6'>Adicionar novo contato</Typography>
      <TextField
        {...register('name')}
        error={!!errors.name?.message}
        helperText={errors.name?.message}
        size='small'
        label='Nome'
      />
      <Stack direction='row' spacing={2} justifyContent='space-between'>
        <TextField
          {...register('cpf')}
          error={!!errors.cpf?.message}
          helperText={errors.cpf?.message}
          fullWidth
          size='small'
          label='CPF'
          inputMode='numeric'
        />
        <TextField
          {...register('phone')}
          error={!!errors.phone?.message}
          helperText={errors.phone?.message}
          fullWidth
          size='small'
          label='Telefone'
          inputMode='tel'
        />
      </Stack>
      <Stack direction='row' spacing={6}>
        <Controller
          name='cep'
          control={control}
          render={({
            fieldState: { error },
            field: { onChange, value, ...rest }
          }) => (
            <TextField
              onChange={(e) => {
                cepCallback(e.target.value)
                onChange(e)
              }}
              value={cepMask(value)}
              error={!!error}
              helperText={error?.message}
              size='small'
              label='CEP'
              inputMode='numeric'
              type='search'
              placeholder='Pesquisar cep'
              {...rest}
            />
          )}
        />
        <TextField
          {...register('street')}
          error={!!errors.street?.message}
          helperText={errors.street?.message}
          fullWidth
          label='Endereço'
          size='small'
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Stack>

      <Stack direction='row' spacing={4}>
        <TextField
          {...register('complement')}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
          size='small'
          label='Complemento'
          defaultValue=''
        />
        <TextField
          {...register('neighborhood')}
          slotProps={{ inputLabel: { shrink: true } }}
          error={!!errors.neighborhood?.message}
          helperText={errors.neighborhood?.message}
          fullWidth
          size='small'
          label='Bairro'
          defaultValue=''
        />

        <TextField
          {...register('number')}
          slotProps={{ inputLabel: { shrink: true } }}
          error={!!errors.number?.message}
          helperText={errors.number?.message}
          size='small'
          label='Número'
          inputMode='numeric'
          defaultValue=''
        />
      </Stack>

      <Stack direction='row' spacing={4}>
        <TextField
          {...register('city')}
          slotProps={{ inputLabel: { shrink: true } }}
          error={!!errors.city?.message}
          helperText={errors.city?.message}
          size='small'
          fullWidth
          label='Cidade'
          defaultValue=''
        />
        <TextField
          {...register('state')}
          slotProps={{ inputLabel: { shrink: true } }}
          error={!!errors.state?.message}
          helperText={errors.state?.message}
          size='small'
          fullWidth
          label='Estado'
          defaultValue=''
        />
        <TextField
          {...register('country')}
          slotProps={{ inputLabel: { shrink: true } }}
          error={!!errors.country?.message}
          helperText={errors.country?.message}
          size='small'
          fullWidth
          label='País'
          defaultValue=' '
        />
      </Stack>
      <Stack direction='row' spacing={4} justifyContent='flex-end'>
        <Button
          variant='contained'
          type='submit'
          disabled={isDisabled}
          loading={isSubmitting}
        >
          {mode === 'create' ? 'Criar' : 'Salvar'}
        </Button>
        <Button onClick={handleUpdateMode} disabled={isSubmitting}>
          Cancelar
        </Button>
      </Stack>
    </Grid>
  )
}
