import { ElementType } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import {
  Card, IconButton, Stack, Typography,
} from '@mui/material';

interface FormCardProps {
  Icon: ElementType;
  label: string;
  value: string;
  details?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function FormCard({
  Icon, label, value, details = undefined, onEdit = undefined, onDelete = undefined,
}: FormCardProps) {
  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between" p={2} spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Icon color="disabled" />
          <Typography display={{ xs: 'none', sm: 'block' }} color="text.disabled">{label}</Typography>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ flexGrow: 1 }} spacing={{ xs: 0, sm: 2 }}>
          <Typography component="div">{value}</Typography>
          {details ? <Typography component="div" color="text.disabled">{details}</Typography> : null}
        </Stack>
        {onEdit ? <IconButton onClick={onEdit}><Edit /></IconButton> : null}
        {onDelete ? <IconButton disabled onClick={onDelete}><Delete /></IconButton> : null}
      </Stack>
    </Card>
  );
}
