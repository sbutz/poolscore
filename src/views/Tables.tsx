import { useContext, useState } from 'react';
import { TableContainer, Table, TableBody, TableRow, TableCell, Button, TableHead, Paper, Stack, Box,
    } from '@mui/material';

import Layout from '../components/Layout';
import { Context } from '../store/Store';
import FormDialog from '../components/FormDialog';
import { NotEmptyValidator } from '../util/Validators';

function Tables() {
    const [state, dispatch] = useContext(Context);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const fields = [
        { label: 'Name', value: name, onChange: setName, validator: NotEmptyValidator },
    ];

    return (
    <Layout title="Tische">
        <Stack spacing={3}>
            <Box>
                <Button variant="contained" onClick={() => {setOpen(true); }}>
                    Neuer Tisch
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.tables.length === 0 ?
                            <TableRow>
                                <TableCell align="center">
                                    Du hast noch keine Tische angelegt.
                                </TableCell>
                            </TableRow> : null}
                        {state.tables.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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