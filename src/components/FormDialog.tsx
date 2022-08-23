import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';

import { Validator, firstErrorMessage } from '../util/Validators';

interface FormFieldProps {
    label: string;
    type?: 'text';
    value: string;
    onChange: (val: string) => void;
    validators: Validator[];
}

function FormField(f : FormFieldProps) {
    const errorMsg = firstErrorMessage(f.value, f.validators);
    return (
        <TextField
            key={f.label}
            type={f.type || 'text'}
            label={f.label}
            value={f.value}
            onChange={(event) => { f.onChange(event.target.value); }}
            helperText={errorMsg}
            error={errorMsg !== null}
            required
            autoFocus
            margin="dense"
        />
    );
}

interface FormDialogProps {
    open: boolean;
    title: string;
    children?: React.ReactNode;
    fields?: FormFieldProps[];
    onCancel: () => void;
    onSave: () => void;
}

function FormDialog(props: FormDialogProps) {
    const invalid = props.fields?.some(f => {
        return firstErrorMessage(f.value, f.validators) !== null;
    });

    return (
    <Dialog open={props.open}>
        <DialogTitle>
            {props.title}
        </DialogTitle>
        <DialogContent>
            <Stack spacing={3}>
                {props.fields?.map(f => <FormField {...f}/>)}
                {props.children}
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onCancel}>Abbrechen</Button>
            <Button onClick={props.onSave} disabled={invalid}>Speichern</Button>
        </DialogActions>
    </Dialog>
    );
}

export default FormDialog;