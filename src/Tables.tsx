import { useContext } from 'react';
import { TableContainer, Table, TableBody, TableRow, TableCell,
    } from '@mui/material';

import Layout from './Layout';
import { Context } from './Store';

function Tables() {
    const state = useContext(Context)[0];

    return (
    <Layout>
        <TableContainer>
            <Table>
                <TableBody>
                    {state.tables.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Layout>
    )
}

export default Tables;