import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material"

export const AlertDialog = ({
  onClickCancel,
  onClickOk,
  open,
  onClose,
  description = '',
  title = 'Alerta',
  cancelButtonText = 'Cancelar',
  okButtonText = 'Continuar',
  ...restProps
}) => {

  return <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    {...restProps}

  >
    <DialogTitle id="alert-dialog-title">
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClickCancel} variant="outlined">
        {cancelButtonText}
      </Button>
      <Button onClick={onClickOk} autoFocus variant="outlined">
        {okButtonText}
      </Button>
    </DialogActions>
  </Dialog>

}
