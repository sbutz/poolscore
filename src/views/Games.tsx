import {
  Button, Card, CardActions, CardContent, Stack, Typography,
} from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { Game, defaultPlayerNames } from '../lib/Game';
import { Mode, getInitialState } from '../lib/GameModes';

function GameCard({
  id, names, mode, state,
}: Game) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Typography color="text.secondary" mb={3}>
            {Mode.toString(mode)}
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          <Grid xs={5.5}>
            <Stack direction={{ xs: 'column-reverse', md: 'column-reverse' }} spacing={{ xs: 0, md: 0 }} justifyContent="center" textAlign="center">
              <Typography variant="overline" fontSize="0.85rem">{names.home}</Typography>
              <Typography variant="h4">{state.home.score}</Typography>
            </Stack>
          </Grid>
          <Grid xs={1} textAlign="center">
            <Typography variant="h4" color="text.secondary">-</Typography>
          </Grid>
          <Grid xs={5.5}>
            <Stack direction={{ xs: 'column', md: 'column' }} spacing={{ xs: 0, md: 0 }} justifyContent="center" textAlign="center">
              <Typography variant="h4">{state.guest.score}</Typography>
              <Typography variant="overline" fontSize="0.85rem">{names.guest}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          startIcon={<PlayArrow />}
          onClick={() => { console.log(id); }}
        >
          Spiel starten
        </Button>
      </CardActions>
    </Card>
  );
}

const games = [
  {
    id: '1', mode: Mode.Ball8, state: getInitialState(Mode.Ball8), names: defaultPlayerNames,
  },
  {
    id: '2', mode: Mode.Ball8, state: getInitialState(Mode.Ball8), names: defaultPlayerNames,
  },
  {
    id: '3', mode: Mode.Ball8, state: getInitialState(Mode.Ball8), names: defaultPlayerNames,
  },
  {
    id: '4', mode: Mode.Ball8, state: getInitialState(Mode.Ball8), names: defaultPlayerNames,
  },
  {
    id: '5', mode: Mode.Ball8, state: getInitialState(Mode.Ball8), names: defaultPlayerNames,
  },
  {
    id: '6', mode: Mode.Straight, state: getInitialState(Mode.Straight), names: defaultPlayerNames,
  },
];

export default function Games() {
  return (
    <Stack spacing={3}>
      {games.map((game: Game) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
        <GameCard key={game.id} {...game} />
      ))}
    </Stack>
  );
}
