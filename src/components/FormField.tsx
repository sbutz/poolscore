import { Box, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import { Validator, firstErrorMessage } from "../util/Validators";

interface FormFieldProps {
    label: string;
    type?: 'text' | 'date';
    value: string;
    onChange: (val: string) => void;
    validators: Validator[];
}

function render(props: FormFieldProps) {
    const errorMsg = firstErrorMessage(props.value, props.validators);
    switch (props.type) {
        case 'date':
            return (
                <DesktopDatePicker
                    label={props.label}
                    inputFormat="DD.MM.YYYY"
                    value={props.value}
                    onChange={(d) => {
                        if (d !== null && dayjs(d).isValid())
                            props.onChange(dayjs(d).format("YYYY-MM-DD"));
                        else
                            props.onChange("");
                    }}
                    renderInput={(params) => <TextField {...params}
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
                    onChange={(e) => { props.onChange(e.target.value); }}
                    helperText={errorMsg || " "}
                    error={errorMsg !== null}
                    required
                />
            );
    }
}

export default function FormField(props : FormFieldProps) {
    return (
        <Box sx={{p: 1}}>
            {render(props)}
        </Box>
    );
}