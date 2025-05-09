import { Alert, Snackbar, type AlertColor } from '@mui/material'
import Slide, { SlideProps } from '@mui/material/Slide';
type ToastProps = {
  message: string
  open: boolean
  handleClose: () => void
  severity?: string
}

export default function Toast({
  message,
  severity = 'info',
  open,
  handleClose
}: ToastProps) {
  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
  }
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      slots={{ transition: SlideTransition }}
      slotProps={{
        clickAwayListener: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          onClickAway: (event) => (event.defaultMuiPrevented = true)
        }
      }}
      open={open}
      autoHideDuration={4500}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity as AlertColor}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
