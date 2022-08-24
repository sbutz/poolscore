import { Box, BoxProps, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import { Validator, firstErrorMessage } from "../util/Validators";

interface FormFieldProps {
    label: string;
    //TODO: support time
    type?: 'text' | 'number' | 'date';
    value: string;
    onChange?: (val: string) => void;
    validators?: Validator[];
    disabled?: boolean;
    sx?: BoxProps['sx'];
}

function render(props: FormFieldProps) {
    const errorMsg = firstErrorMessage(props.value, props.validators || []);
    switch (props.type) {
        case 'date':
            return (
                <DesktopDatePicker
                    label={props.label}
                    inputFormat="DD.MM.YYYY"
                    value={props.value}
                    onChange={(d) => {
                        if (d !== null && dayjs(d).isValid())
                            props.onChange?.(dayjs(d).format("YYYY-MM-DD"));
                        else
                            props.onChange?.("");
                    }}
                    renderInput={(params) => <TextField {...params}
                    disabled={props.disabled}
                    sx={{mb: 3}}
                />}
              />
            );
        case 'text':
        default:
            return (
                <TextField
                    type={props.type || 'text'}
                    label={props.label}
                    value={props.value}
                    onChange={(e) => { props.onChange?.(e.target.value); }}
                    helperText={errorMsg || " "}
                    error={errorMsg !== null}
                    disabled={props.disabled}
                    fullWidth
                />
            );
    }
}

export default function FormField(props : FormFieldProps) {
    return (
        <Box sx={{pt: 1, px: 1, ...props.sx}}>
            {render(props)}
        </Box>
    );
}