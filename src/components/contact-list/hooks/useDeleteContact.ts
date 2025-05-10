import { useCallback, useState } from "react"
import { deleteContact } from '@/services'

export function useDeleteContact() {

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: ''
  })

  const onDeleteContact = useCallback(async (id: number) => {
    deleteContact(id)
      .then(() => {
        setToast({
          message: 'Contato removido com sucesso!',
          open: true,
          severity: 'success'
        })
      })
      .catch(() => {
        setToast({
          message: 'Ocorreu um error ao remover o contato',
          open: true,
          severity: 'error'
        })
      })

  }, [])
  function handleCloseToast() {
    setToast((prev) => ({ ...prev, message: '', open: false }))
  }
  return { onDeleteContact, toast, handleCloseToast }
}