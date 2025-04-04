import { Box, Stack } from '@mui/material';
import { useParams } from 'react-router';
import { ReactComponent as BC73 } from '../../assets/bc73_transparent.svg';
import MatchScore from './MatchScore';
import GameScore from './GameScore';
import { useMatchday } from '../../store/Matchday';
import { Game } from '../../lib/Game';

export default function StreamOverlay() {
  const { id } = useParams();
  const [matchday] = useMatchday(id);
  const game = matchday?.games.find((g) => !Game.isFinished(g));

  return (
    <Stack height="100vh" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
      <Box
        sx={{
          position: 'fixed', top: 0, left: 0, margin: '2rem',
        }}
      >
        {matchday ? <MatchScore matchday={matchday} /> : null}
      </Box>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          margin: '2rem',
        }}
      >
        {/* TODO: Use club's logo */}
        <BC73 fill="0xffffff" stroke="white" width="7rem" height="7rem" opacity={0.7} />
      </Box>
      <Stack
        alignItems="center"
        width="100%"
        sx={{ position: 'fixed', bottom: '2rem' }}
      >
        {game ? <GameScore game={game} /> : null}
      </Stack>
    </Stack>
  );
}
