import { TextField } from "@mui/material";

import { Validator, firstErrorMessage } from "../util/Validators";

interface FormFieldProps {
    label: string;
    type?: 'text';
    value: string;
    onChange: (val: string) => void;
    validators: Validator[];
}

export default function FormField(f : FormFieldProps) {
    const errorMsg = firstErrorMessage(f.value, f.validators);
    return (
        <TextField
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