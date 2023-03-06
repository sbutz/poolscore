import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

interface FormDialogProps {
  open: boolean;
  title: string;
  children?: React.ReactNode;
  onCancel: () => void;
  disableSave?: boolean;
  onSave: () => void;
}

export default function FormDialog({
  open, title, children = null, onCancel, disableSave = false, onSave,
}: FormDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog open={open} fullScreen={fullScreen} maxWidth="md">
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Abbrechen</Button>
        <Button
          onClick={onSave}
          disabled={disableSave}
        >
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
}
