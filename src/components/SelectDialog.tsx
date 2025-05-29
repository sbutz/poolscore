import { useEffect, useState } from 'react';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import usePreviousValue from '../util/usePreviousValue';
import FormDialog from './FormDialog';

interface SelectDialogProps<T> {
  title: string;
  open: boolean;
  value: T;
  items: T[];
  onCancel: () => void;
  onAccept: (newValue: T) => void;
}

export default function SelectDialog<T>({
  open, title, value, items, onCancel, onAccept,
}: SelectDialogProps<T>) {
  const [newValue, setNewValue] = useState<T>(value);

  const previousOpen = usePreviousValue(open);
  useEffect(() => {
    if (open && !previousOpen) setNewValue(value);
  }, [open, previousOpen, value]);

  return (
    <FormDialog open={open} title={title} onCancel={onCancel} onAccept={() => { onAccept(newValue); }}>
      <FormControl fullWidth sx={{ mt: 1 }}>
        <InputLabel id="select-dialog-label">{title}</InputLabel>
        <Select
          labelId="select-dialog-label"
          id="demo-simple-select"
          value={newValue}
          label={title}
          onChange={(e) => { setNewValue(e.target.value as T); }}
        >
          {items.map((preset) => (
            <MenuItem key={String(preset)} value={String(preset)}>
              {String(preset)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FormDialog>
  );
}
