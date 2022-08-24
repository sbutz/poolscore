import { useContext } from 'react';
import { Box, Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import { Add, Delete, Edit, Tv } from '@mui/icons-material';
import dayjs from 'dayjs';

import Layout from '../components/Layout';
import { Context, Matchday } from '../store/Store';
import { Link } from 'react-router-dom';

function MatchdayCard(m: Matchday) {
    return (
        <Card sx={{my: 2}}>
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
                <Button color="primary" startIcon={<Tv/>}>Live-Score</Button>
                <Button color="primary" startIcon={<Edit/>}>Bearbeiten</Button>
                <Button color="primary" startIcon={<Delete/>}>Löschen</Button>
            </CardActions>
        </Card>
    );
}

export default function Matchdays() {
    const state = useContext(Context)[0];

    return (
    <Layout title="Spieltage">
        <Stack spacing={3}>
            <Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    component={Link}
                    to={"/matchday/1"}
                >
                    Neuer Spieltag
                </Button>
            </Box>
            {state.matchdays.length === 0 ?
                <Typography>
                    Du hast noch keine Spieltage angelegt.
                </Typography> : null }
            {state.matchdays.map(m => <MatchdayCard key={m.id} {...m} />)}
        </Stack>
    </Layout>
    )
}