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

function AlertDialog(props: AlertDialogProps) {
  return (
    <Dialog open={props.open}>
      <DialogTitle>
        {props.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel}>{props.cancelText}</Button>
        <Button onClick={props.onAccept} autoFocus>
          {props.acceptText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
