import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import usePreviousValue from '../../util/usePreviousValue';
import FormDialog from '../../components/FormDialog';

interface TextFormDialogProps {
  title: string;
  open: boolean;
  value: string;
  onCancel: () => void;
  onAccept: (newValue: string) => void;
}

export default function TextFormDialog({
  open, title, value, onCancel, onAccept,
}: TextFormDialogProps) {
  const [newValue, setNewValue] = useState(value);

  const previousOpen = usePreviousValue(open);
  useEffect(() => {
    if (open && !previousOpen) setNewValue(value);
  }, [open, previousOpen, value]);

  return (
    <FormDialog open={open} title={title} onCancel={onCancel} onAccept={() => { onAccept(newValue); }}>
      <TextField variant="standard" fullWidth value={newValue} onChange={(e) => setNewValue(e.target.value)} />
    </FormDialog>
  );
}
