import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

interface FormDialogProps {
    open: boolean;
    title: string;
    children?: React.ReactNode;
    onCancel: () => void;
    disableSave?: boolean;
    onSave: () => void;
}

export default function FormDialog(props: FormDialogProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
    <Dialog open={props.open} fullScreen={fullScreen}>
        <DialogTitle>
            {props.title}
        </DialogTitle>
        <DialogContent>
            {props.children}
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onCancel}>Abbrechen</Button>
            <Button
                onClick={props.onSave}
                disabled={'disableSave' in props ? props.disableSave : false}
            >
                Speichern
            </Button>
        </DialogActions>
    </Dialog>
    );
}