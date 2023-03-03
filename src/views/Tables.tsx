import { useContext, useState } from 'react';
import {
  Button, Stack, Box, Typography, CardActions, Card, CardContent,
} from '@mui/material';
import { Add } from '@mui/icons-material';

import Layout from '../components/Layout';
import { Context } from '../store/Store';
import FormDialog from '../components/FormDialog';
import FormField from '../components/FormField';
import { firstErrorMessage, NotEmptyValidator, NotInValidator } from '../util/Validators';

function Tables() {
  const [state, dispatch] = useContext(Context);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const fields = [
    {
      label: 'Name',
      value: name,
      onChange: setName,
      validators: [
        NotEmptyValidator,
        NotInValidator(state.tables.map((t) => t.name), 'Existiert bereits.'),
      ],
    },
  ];
  const invalid = fields.some((f) => firstErrorMessage(f.value, f.validators) !== null);

  return (
    <Layout title="Tische">
      <Stack spacing={3}>
        <Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setOpen(true);
            }}
          >
            Neuer Tisch
          </Button>
        </Box>
        {state.tables.length === 0
          ? (
            <Typography>
              Du hast noch keine Tische angelegt.
            </Typography>
          ) : null }
        {state.tables.map((t) => (
          <Card key={t.id} sx={{ my: 2 }}>
            <CardContent>
              <Typography variant="h6">{t.name}</Typography>
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                onClick={() => {
                  dispatch?.({ type: 'delete_table', tableId: t.id });
                }}
              >
                Löschen
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
      <FormDialog
        open={open}
        title="Neuer Tisch"
        onCancel={() => { setOpen(false); }}
        disableSave={invalid}
        onSave={() => {
          dispatch?.({
            type: 'add_table',
            tableName: name,
          }).finally(() => {
            setOpen(false);
            setName('');
          });
        }}
      >
        {fields.map((f) => <FormField key={f.label} {...f} />)}
      </FormDialog>
    </Layout>
  );
}

export default Tables;
