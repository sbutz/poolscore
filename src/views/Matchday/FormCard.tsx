import { ElementType } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import {
  Card, IconButton, Stack, Typography,
} from '@mui/material';

interface FormCardProps {
  Icon: ElementType;
  label: string;
  value: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function FormCard({
  Icon, label, value, onEdit = undefined, onDelete = undefined,
}: FormCardProps) {
  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between" p={2} spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Icon color="disabled" />
          <Typography color="text.disabled">{label}</Typography>
        </Stack>
        <Typography component="div" sx={{ flexGrow: 1 }}>{value}</Typography>
        {onEdit ? <IconButton onClick={onEdit}><Edit /></IconButton> : null}
        {onDelete ? <IconButton disabled onClick={onDelete}><Delete /></IconButton> : null}
      </Stack>
    </Card>
  );
}
