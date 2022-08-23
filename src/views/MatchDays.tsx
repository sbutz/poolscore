import { useContext } from 'react';
import { Box, Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

import Layout from '../components/Layout';
import { Context } from '../store/Store';

export default function MatchDays() {
    const state = useContext(Context)[0];

    return (
    <Layout title="Spieltage">
        <Stack spacing={3}>
            <Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                >
                    Neuer Spieltag
                </Button>
            </Box>
            {state.matchdays.length === 0 ?
                <Typography>
                    Du hast noch keine Spieltage angelegt.
                </Typography> : null }
            {state.matchdays.map(m => (
                <Card sx={{my: 2}} key={m.id}>
                    <CardContent>
                        <Typography variant="subtitle1" color="text.secondary">
                            {dayjs(m.startTime).format("DD.MM.YYYY")}
                        </Typography>
                        <Stack direction="row" spacing={5} alignItems="center">
                            <Typography variant="h6">
                                {`${m.home} - ${m.guest}`}
                            </Typography>
                            <Chip
                                label={m.winner === "home" ? "Sieg" : "Niederlage"}
                                color={m.winner === "home" ? "success" : "error"}
                                size="small"
                                />
                        </Stack>
                        <Typography>
                            {`${m.points.home} - ${m.points.guest}`}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            color="primary"
                            onClick={() => {
                                //dispatch?.({type: 'delete_table', tableId: row.id});
                            }}
                        >
                            Löschen
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Stack>
    </Layout>
    )
}