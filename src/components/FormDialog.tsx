import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

import { Validator } from '../util/Validators';

interface FormField {
    label: string;
    value: string;
    onChange: (val: string) => void;
    validator?: Validator;
}

interface FormDialogProps {
    open: boolean;
    title: string;
    fields: FormField[];
    onCancel: () => void;
    onSave: () => void;
}

function FormDialog(props: FormDialogProps) {
    const invalid = props.fields.some(f => f.validator?.(f.value) !== null);
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
                    onChange={(event) => { f.onChange(event.target.value); }}
                    helperText={f.validator?.(f.value)}
                    error={f.validator?.(f.value) !== null}
                    required
                    autoFocus
                    margin="dense"
              />

            ))}
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onCancel}>Abbrechen</Button>
            <Button onClick={props.onSave} disabled={invalid}>Speichern</Button>
        </DialogActions>
    </Dialog>
    );
}

export default FormDialog;