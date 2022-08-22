import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

import { Validator, firstErrorMessage } from '../util/Validators';

interface FormField {
    label: string;
    value: string;
    onChange: (val: string) => void;
    validators: Validator[];
}

interface FormDialogProps {
    open: boolean;
    title: string;
    fields: FormField[];
    onCancel: () => void;
    onSave: () => void;
}

function FormDialog(props: FormDialogProps) {
    const invalid = props.fields.some(f => {
        return firstErrorMessage(f.value, f.validators) !== null;
    });

    return (
    <Dialog open={props.open}>
        <DialogTitle>
            {props.title}
        </DialogTitle>
        <DialogContent>
            {props.fields.map(f => {
                const errorMsg = firstErrorMessage(f.value, f.validators);

                return (
                <TextField
                    key={f.label}
                    type={'text'}
                    label={f.label}
                    value={f.value}
                    onChange={(event) => { f.onChange(event.target.value); }}
                    helperText={errorMsg}
                    error={errorMsg !== null}
                    required
                    autoFocus
                    margin="dense"
                />
                )

            })}
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onCancel}>Abbrechen</Button>
            <Button onClick={props.onSave} disabled={invalid}>Speichern</Button>
        </DialogActions>
    </Dialog>
    );
}

export default FormDialog;