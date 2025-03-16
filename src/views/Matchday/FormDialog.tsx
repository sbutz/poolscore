import { useEffect, useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import usePreviousValue from '../../util/usePreviousValue';

interface FormDialogProps {
  title: string;
  open: boolean;
  value: string;
  onCancel: () => void;
  onAccept: (newValue: string) => void;
}

export default function FormDialog({
  open, title, value, onCancel, onAccept,
}: FormDialogProps) {
  const [newValue, setNewValue] = useState(value);

  const previousOpen = usePreviousValue(open);
  useEffect(() => {
    if (open && !previousOpen) setNewValue(value);
  }, [open, previousOpen, value]);

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField variant="standard" fullWidth value={newValue} onChange={(e) => setNewValue(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Abbrechen</Button>
        <Button onClick={() => onAccept(newValue)}>Speichern</Button>
      </DialogActions>
    </Dialog>
  );
}
