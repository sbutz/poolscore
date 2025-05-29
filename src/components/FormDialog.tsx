import { ReactNode } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';

interface FormDialogProps {
  title: string;
  open: boolean;
  onCancel: () => void;
  onAccept: () => void;
  children: ReactNode;
}

export default function FormDialog({
  open, title, onCancel, onAccept, children,
}: FormDialogProps) {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Abbrechen</Button>
        <Button onClick={onAccept}>Speichern</Button>
      </DialogActions>
    </Dialog>
  );
}
