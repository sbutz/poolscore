import { useState } from 'react';
import {
  Button, Stack, Box, Typography, CardActions, Card, CardContent,
} from '@mui/material';
import { Add, Delete, VpnKey } from '@mui/icons-material';

import Layout from '../components/HomeLayout';
import FormDialog from '../components/FormDialog';
import FormField from '../components/FormField';
import { firstErrorMessage, NotEmptyValidator, NotInValidator } from '../util/Validators';
import { useTables } from '../store/TableProvider';
import AlertDialog from '../components/AlertDialog';

export default function Tables() {
  const {
    tables, addTable, removeTable, generateToken,
  } = useTables();
  const [openNew, setOpenNew] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [name, setName] = useState('');
  const fields = [
    {
      label: 'Name',
      value: name,
      onChange: setName,
      validators: [
        NotEmptyValidator,
        NotInValidator(tables.map((t) => t.name), 'Existiert bereits.'),
      ],
    },
  ];
  const invalid = fields.some((f) => firstErrorMessage(f.value, f.validators) !== null);
  const now = new Date();

  return (
    <Layout>
      <Stack spacing={3}>
        <Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setName('');
              setOpenNew(true);
            }}
          >
            Neuer Tisch
          </Button>
        </Box>
        {tables.length === 0
          ? (
            <Typography>
              Du hast noch keine Tische angelegt.
            </Typography>
          ) : null }
        {tables.map((t) => (
          <Card key={t.name} sx={{ my: 2 }}>
            <CardContent>
              <Typography variant="h6">{t.name}</Typography>
              {t.token && t.token.expires > now
                ? (
                  <Typography variant="body1" color="text.secondary">
                    Token:
                    {' '}
                    {t.token.value}
                    {' '}
                    (gültig bis
                    {' '}
                    {(new Date(t.token.expires)).getHours()}
                    :
                    {(new Date(t.token.expires)).getMinutes()}
                    {' '}
                    Uhr)
                  </Typography>
                ) : null }
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                disabled={Boolean(t.token && t.token.expires > now)}
                onClick={() => {
                  generateToken(t.name);
                }}
                startIcon={<VpnKey />}
              >
                Token generieren
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  setName(t.name);
                  setOpenDelete(true);
                }}
                startIcon={<Delete />}
              >
                Löschen
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
      <FormDialog
        open={openNew}
        title="Neuer Tisch"
        onCancel={() => { setOpenNew(false); }}
        disableSave={invalid}
        onSave={() => {
          addTable(name);
          setOpenNew(false);
        }}
      >
        {fields.map((f) => (
          <FormField
            key={f.label}
            label={f.label}
            value={f.value}
            onChange={f.onChange}
            validators={f.validators}
          />
        ))}
      </FormDialog>
      <AlertDialog
        open={openDelete}
        title="Tisch löschen"
        text="Vorsicht: Das Löschen eines Tisches der in Benutzung ist kann unerwartete Auswirkungen haben."
        cancelText="Abbrechen"
        onCancel={() => {
          setOpenDelete(false);
        }}
        acceptText="Löschen"
        onAccept={() => {
          removeTable(name);
          setOpenDelete(false);
        }}
      />
    </Layout>
  );
}
