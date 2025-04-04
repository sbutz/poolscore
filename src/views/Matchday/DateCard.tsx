import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Edit, Event } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Card, IconButton, Stack, Typography,
} from '@mui/material';
import {
  BaseSingleInputFieldProps, DateValidationError, FieldSection, UseDateFieldProps,
} from '@mui/x-date-pickers';

interface DateFormCardProps
  extends UseDateFieldProps<Dayjs, false>,
  BaseSingleInputFieldProps<Dayjs | null, Dayjs, FieldSection, false, DateValidationError> {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  label: string;
}

function DateFormCard(props: DateFormCardProps) {
  const {
    setOpen,
    label,
    value,
    InputProps: { ref } = {},
    inputProps: { 'aria-label': ariaLabel } = {},
  } = props;

  const onEdit = () => setOpen(true);
  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between" p={2} spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Event color="disabled" />
          <Typography color="text.disabled">{label}</Typography>
        </Stack>
        <Typography component="div" sx={{ flexGrow: 1 }}>{dayjs(value).format('DD.MM.YYYY')}</Typography>
        <IconButton ref={ref} aria-label={ariaLabel} onClick={onEdit}><Edit /></IconButton>
      </Stack>
    </Card>
  );
}

interface DateCardProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
}

export default function DateCard({ label, value, onChange }: DateCardProps) {
  const [open, setOpen] = useState(false);

  const onAccept = (date: Dayjs | null) => {
    if (date) {
      onChange(date.toDate());
    }
    setOpen(false);
  };

  return (
    <DatePicker
      open={open}
      onClose={() => setOpen(false)}
      onChange={onAccept}
      closeOnSelect
      slots={{ field: DateFormCard }}
      slotProps={{
        field: {
          setOpen, label, value,
        } as any,
      }}
    />
  );
}
