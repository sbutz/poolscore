import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface FormField {
    label: string;
    value: string;
    onChange: (a: string) => void;
    errorMessage?: string;
}

interface FormDialogProps {
    open: boolean;
    title: string;
    fields: FormField[];
    onCancel: () => void;
    onSave: () => void;
}

function FormDialog(props: FormDialogProps) {
    return (
    <Dialog open={props.open}>
        <DialogTitle>
            {props.title}
        </DialogTitle>
        <DialogContent>
            {props.fields.map(f => (
                <TextField
                    key={f.label}
                    type={'text'}
                    label={f.label}
                    value={f.value}
                    onChange={event => { f.onChange(event.target.value); }}
                    autoFocus
                    required
                    margin="dense"
              />

            ))}
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onCancel}>Abbrechen</Button>
            <Button onClick={props.onSave}>Speichern</Button>
        </DialogActions>
    </Dialog>
    );
}

export default FormDialog;