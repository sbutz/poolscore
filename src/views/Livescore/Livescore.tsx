import { useParams } from 'react-router';
import {
  Box,
  Card,
  Grid2 as Grid, Stack, Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMatchday } from '../../store/Matchday';
import { Game } from '../../lib/Game';
import { Mode } from '../../lib/GameModes';
import { Matchday } from '../../lib/Matchday';

interface TeamCardProps {
  matchday: Matchday;
}
function TeamCard({ matchday }: TeamCardProps) {
  return (
    <Card>
      <Grid container spacing={1} padding={2} alignItems="center">
        <Grid size={{ xs: 3, sm: 4, md: 5 }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
            { matchday.teams.home.iconUrl
              ? (
                <Box
                  component="img"
                  src={matchday.teams.home.iconUrl}
                  alt={`${matchday.teams.home.name} icon`}
                  sx={{ width: 64, height: 64, objectFit: 'contain' }}
                />
              )
              : null }
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              {matchday.teams.home.name}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 2 }} textAlign="center">
          <Typography variant="h2" fontWeight="bold">
            {Matchday.getScore(matchday, 'home')}
            {' - '}
            {Matchday.getScore(matchday, 'guest')}
          </Typography>
        </Grid>
        <Grid size={{ xs: 3, sm: 4, md: 5 }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              {matchday.teams.guest.name}
            </Typography>
            { matchday.teams.guest.iconUrl
              ? (
                <Box
                  component="img"
                  src={matchday.teams.guest.iconUrl}
                  alt={`${matchday.teams.guest.name} icon`}
                  sx={{ width: 64, height: 64, objectFit: 'contain' }}
                />
              )
              : null }
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

const ScoreText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h5.fontWeight,
  textTransform: 'uppercase',
}));
const ExplainText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  color: theme.palette.text.disabled,
}));

interface GameCardProps {
  game: Game;
}
function GameCard({ game } : GameCardProps) {
  const label = `${Mode.toString(game.mode)} (Race to ${game.raceTo})`;
  const color = Game.isFinished(game) ? 'text.secondary' : 'text.primary';
  return (
    <Card>
      <Grid container spacing={1} padding={2} alignItems="center">
        <Grid size={{ xs: 12, md: 2 }} textAlign="center">
          <ExplainText>{label}</ExplainText>
        </Grid>
        <Grid size={{ xs: 5, md: 3 }} textAlign={{ xs: 'center', md: 'end' }}>
          <ScoreText color={color}>{game.names.home}</ScoreText>
        </Grid>
        <Grid size={{ xs: 2, md: 2 }} textAlign="center">
          <ScoreText color={color}>
            {game.state.home.score}
            {' - '}
            {game.state.guest.score}
          </ScoreText>
        </Grid>
        <Grid size={{ xs: 5, md: 3 }} textAlign={{ xs: 'center', md: 'start' }}>
          <ScoreText color={color}>{game.names.guest}</ScoreText>
        </Grid>
      </Grid>
    </Card>
  );
}

export default function Livescore() {
  const { id } = useParams();
  const [matchday] = useMatchday(id);

  if (!matchday) { return <p>Lade Spieltag ...</p>; }

  const finishedGames = matchday.games.filter((g) => Game.isFinished(g));
  let slice : [number, number] = [0, 4];
  if (finishedGames.length >= 4 && finishedGames.length < 6) {
    slice = [4, 6];
  } else if (finishedGames.length >= 6) {
    slice = [6, 10];
  }
  const games = matchday.games.slice(...slice);

  return (
    <Stack direction="column" spacing={4} width="100%" p={4}>
      <TeamCard matchday={matchday} />
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </Stack>
  );
}
