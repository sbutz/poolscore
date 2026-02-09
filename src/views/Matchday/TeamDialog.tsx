import { useEffect, useState } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import FormDialog from '../../components/FormDialog';
import usePreviousValue from '../../util/usePreviousValue';
import useTeams from '../../store/TeamProvider';
import { Team } from '../../lib/Team';

interface TeamDialogProps {
  title: string;
  open: boolean;
  value: Team;
  onCancel: () => void;
  onAccept: (newValue: Team) => void;
}

export default function TeamDialog({
  open, title, value, onCancel, onAccept,
}: TeamDialogProps) {
  const [newValue, setNewValue] = useState(value);

  const previousOpen = usePreviousValue(open);
  useEffect(() => {
    if (open && !previousOpen) setNewValue(value);
  }, [open, previousOpen, value]);

  const teams = useTeams();

  return (
    <FormDialog open={open} title={title} onCancel={onCancel} onAccept={() => { onAccept(newValue); }}>
      <Autocomplete
        sx={{ width: 300 }}
        options={teams}
        value={newValue}
        onChange={(event, v) => {
          if (v) setNewValue(v);
        }}
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => {
          // eslint-disable-next-line react/prop-types
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...optionProps}
            >
              { option.iconUrl
              && (
              <img
                loading="lazy"
                width="20"
                src={option.iconUrl}
                alt={`${option.name} icon`}
              />
              ) }
              {option.name}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label={title}
            slotProps={{
              htmlInput: {
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              },
            }}
          />
        )}
      />
    </FormDialog>
  );
}
