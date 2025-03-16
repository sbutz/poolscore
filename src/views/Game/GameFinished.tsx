import { Stack, Typography } from '@mui/material';
import { Game } from '../../lib/Game';

interface GameFinishedProps {
  game: Game;
}
export default function GameFinished({ game } : GameFinishedProps) {
  const winner = Game.getWinner(game);
  if (!winner) throw Error('Game is not finished');
  const winnerName = winner === 'home' ? game.names.home : game.names.guest;

  return (
    <Stack height="100%" alignItems="center" justifyContent="space-around">
      <Typography variant="h1">
        {`Sieg für ${winnerName}`}
      </Typography>
    </Stack>
  );
}
