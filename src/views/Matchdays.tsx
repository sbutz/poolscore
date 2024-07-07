import {
  Button, Card, CardActions, CardContent, Fab, Grid, Stack,
  Typography,
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
  { id: '1', names: { home: 'BC 73 Pfeffenhausen II', guest: 'BC Olimpia München' }, games: [] },
];

export default function Matchdays() {
  return (
    <Stack spacing={3}>
      <div>
        <Button
          variant="contained"
          startIcon={<Add />}
          component={Link}
          to="/matchdays/new"
        >
          Neuer Spieltag
        </Button>
      </div>
      {matchdays.map((matchday: Matchday) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <MatchdayCard key={matchday.id} {...matchday} />
      ))}
    </Stack>
  );
}
