import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle,
} from '@mui/material';

interface AlertDialogProps {
  open: boolean;
  title: string;
  text: string;
  cancelText: string;
  onCancel: () => void;
  acceptText: string;
  onAccept: () => void;
}

function AlertDialog({
  open, title, text, cancelText, onCancel, acceptText, onAccept,
}: AlertDialogProps) {
  return (
    <Dialog open={open}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button onClick={onAccept} autoFocus>
          {acceptText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
