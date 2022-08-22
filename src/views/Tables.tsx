import { useContext, useState } from 'react';
import { Button, Paper, Stack, Box, List, ListItem, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

import Layout from '../components/Layout';
import { Context } from '../store/Store';
import FormDialog from '../components/FormDialog';
import { NotEmptyValidator, NotInValidator } from '../util/Validators';

function Tables() {
    const [state, dispatch] = useContext(Context);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const fields = [
        {
            label: 'Name',
            value: name,
            onChange: setName,
            validators: [
                NotEmptyValidator,
                NotInValidator(state.tables.map(t => t.name), "Existiert bereits."),
            ],
        },
    ];

    return (
    <Layout title="Tische">
        <Stack spacing={3}>
            <Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => {setOpen(true);
                }}>
                    Neuer Tisch
                </Button>
            </Box>
            <List>
                {state.tables.length === 0 ?
                    <Typography>
                        Du hast noch keine Tische angelegt.
                    </Typography> : null }
                {state.tables.map((row) => (
                    <ListItem
                        key={row.id}
                        component={Paper}
                        sx={{py: 2, my: 2}}
                        secondaryAction={
                            <Button
                                variant="contained"
                                startIcon={<Delete />}
                                color="error"
                                onClick={() => {
                                    dispatch?.({type: 'delete_table', tableId: row.id});
                                }}
                            >
                                Löschen
                            </Button>
                        }>
                        {row.name}
                    </ListItem>
                ))}
            </List>
        </Stack>
        <FormDialog
            open={open}
            title="Neuer Tisch"
            fields={fields}
            onCancel={() => { setOpen(false); }}
            onSave={() => {
                dispatch?.({
                    type: 'add_table',
                    tableName: name,
                }).finally(() => {
                    setOpen(false);
                    setName("");
                });
            }}
        />
    </Layout>
    )
}

export default Tables;