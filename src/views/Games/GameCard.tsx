import {
  Button, Card, CardActions, CardContent, Stack, Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { PlayArrow } from '@mui/icons-material';
import { Link } from 'react-router';
import { Mode } from '../../lib/GameModes';
import { Game } from '../../lib/Game';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const {
    id, names, mode, state,
  } = game;
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Typography color="text.secondary">
            {Mode.toString(mode)}
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          <Grid size={5.5}>
            <Stack direction={{ xs: 'column-reverse', md: 'column-reverse' }} spacing={{ xs: 0, md: 0 }} justifyContent="center" textAlign="center">
              <Typography variant="overline" fontSize="0.85rem">{names.home}</Typography>
              <Typography variant="h4">{state.home.score}</Typography>
            </Stack>
          </Grid>
          <Grid size={1} textAlign="center">
            <Typography variant="h4" color="text.secondary">-</Typography>
          </Grid>
          <Grid size={5.5}>
            <Stack direction={{ xs: 'column', md: 'column' }} spacing={{ xs: 0, md: 0 }} justifyContent="center" textAlign="center">
              <Typography variant="h4">{state.guest.score}</Typography>
              <Typography variant="overline" fontSize="0.85rem">{names.guest}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button startIcon={<PlayArrow />} component={Link} to={`/games/${id}`}>
          Spiel starten
        </Button>
      </CardActions>
    </Card>
  );
}
