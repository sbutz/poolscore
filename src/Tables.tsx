import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { TableContainer, Table, TableBody, TableRow, TableCell,
    } from '@mui/material';

import Layout from './Layout';
import { db } from './Firebase';

interface Pooltable {
    id: string,
    name: string,
}

function Tables() {
    const [tables, setTables] = useState<Pooltable[]>([]);

    useEffect(() => {
        const tableRef = collection(db, "table");
        return onSnapshot(tableRef, (snapshot) => {
            const tmp : Pooltable[] = []
            snapshot.forEach((doc) => {
                tmp.push({
                    id: doc.id,
                    name: doc.data().name,
                })
                console.log(doc.data());
            });
            setTables(tmp);
        });
    }, []);

    return (
    <Layout>
        <TableContainer>
            <Table>
                <TableBody>
                    {tables.map((row) => (
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