import {
  Box, Button, Card, CardActions, CardContent, Fab, Stack, Typography, Grid,
} from '@mui/material';
import { Add, Edit, Share } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Matchday } from '../lib/Matchday';

function MatchdayCard(m: Matchday) {
  const { id, names } = m;
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Typography color="text.secondary" mb={3} />
        </Stack>

        <Grid container spacing={2}>
          <Grid xs={5.5}>
            <Stack direction={{ xs: 'column-reverse', md: 'column-reverse' }} spacing={{ xs: 0, md: 0 }} justifyContent="center" textAlign="center">
              <Typography variant="overline" fontSize="0.85rem">{names.home}</Typography>
              <Typography variant="h4">{Matchday.getScore(m, 'home')}</Typography>
            </Stack>
          </Grid>
          <Grid xs={1} textAlign="center">
            <Typography variant="h4" color="text.secondary">-</Typography>
          </Grid>
          <Grid xs={5.5}>
            <Stack direction={{ xs: 'column', md: 'column' }} spacing={{ xs: 0, md: 0 }} justifyContent="center" textAlign="center">
              <Typography variant="h4">{Matchday.getScore(m, 'guest')}</Typography>
              <Typography variant="overline" fontSize="0.85rem">{names.guest}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          startIcon={<Edit />}
          onClick={() => { console.log(id); }}
        >
          Bearbeiten
        </Button>
        <Button
          startIcon={<Share />}
          onClick={() => { console.log(id); }}
        >
          Livescore
        </Button>
      </CardActions>
    </Card>
  );
}

const matchdays : Matchday[] = [
  { id: '1', names: { home: 'Team Niederbayern', guest: 'Team Tirol' }, games: [] },
  { id: '2', names: { home: 'BC73 Pfeffenhausen 2', guest: 'BSV Münschen 1' }, games: [] },
  { id: '3', names: { home: 'Team Niederbayern', guest: 'Team Tirol' }, games: [] },
];

export default function Matchdays() {
  return (
    <Stack spacing={3}>
      {matchdays.map((matchday: Matchday) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <MatchdayCard key={matchday.id} {...matchday} />
      ))}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          padding: '1rem',
        }}
      >
        <Fab variant="extended" color="secondary" aria-label="add" component={Link} to="/matchdays/new">
          <Add />
          Neuer Spieltag
        </Fab>
      </Box>
    </Stack>
  );
}
