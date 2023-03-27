import { memo } from 'react';
import dayjs from 'dayjs';
import {
  Box, FormControl, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import { DesktopDatePicker, TimePicker } from '@mui/x-date-pickers';

import { Validator, firstErrorMessage } from '../util/Validators';

export type FormFieldType = 'text' | 'password' | 'number' | 'select' | 'date' | 'time';

interface FormFieldProps {
  label: string;
  type?: FormFieldType;
  value: string;
  options?: string[];
  onChange?: (val: string) => void;
  validators?: Validator[];
  disabled?: boolean;
}

function FormFieldBuilder({
  label, type = 'text', value, options = [], onChange = undefined, validators = [], disabled = false,
}: FormFieldProps) {
  const errorMsg = firstErrorMessage(value, validators || []);
  let field;
  switch (type) {
    case 'select':
      field = (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id={label}>{label}</InputLabel>
          <Select
            labelId={label}
            value={value}
            label={label}
            onChange={(e) => { onChange?.(e.target.value); }}
            fullWidth
          >
            {options?.map((o) => (
              <MenuItem
                key={o}
                value={o}
                selected={o === value}
              >
                {o}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
      break;
    case 'date':
      field = (
        <DesktopDatePicker
          label={label}
          inputFormat="DD.MM.YYYY"
          value={value}
          onChange={(d) => {
            if (d !== null && dayjs(d).isValid()) onChange?.(dayjs(d).format('YYYY-MM-DD HH:mm'));
            else onChange?.('');
          }}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              disabled={disabled}
              sx={{ mb: 3 }}
              fullWidth
            />
          )}
        />
      );
      break;
    case 'time':
      field = (
        <Box sx={{ mb: 3, width: '100%' }}>
          <TimePicker
            label={label}
            value={value}
            ampm={false}
            views={['hours', 'minutes']}
            inputFormat="YYYY-MM-DD HH:mm"
            onChange={(newValue) => {
              if (dayjs(newValue).isValid()) onChange?.(dayjs(newValue).format('YYYY-MM-DD HH:mm'));
            }}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                fullWidth
              />
            )}
            disabled={disabled}
          />
        </Box>
      );
      break;
    case 'text':
    case 'password':
    case 'number':
    default:
      field = (
        <TextField
          type={type}
          label={label}
          value={value}
          onChange={(e) => { onChange?.(e.target.value); }}
          helperText={errorMsg || ' '}
          error={errorMsg !== null}
          disabled={disabled}
          fullWidth
        />
      );
      break;
  }

  return (
    <Box sx={{ pt: 1, px: 1, width: '100%' }}>
      {field}
    </Box>
  );
}

export default memo(FormFieldBuilder);
