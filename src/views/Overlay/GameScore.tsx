import { Stack, Typography } from '@mui/material';
import { Game } from '../../lib/Game';

const borderRadius = '0.25rem';
const backgroundImage = 'linear-gradient(180deg, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.15) 50%)';
const fontSize = 24;

interface GameScoreProps {
  game: Game;
}

export default function GameScore({ game }: GameScoreProps) {
  const { names, raceTo, state } = game;
  return (
    <Stack direction="row" spacing={0} sx={{ backgroundImage, color: 'white' }}>
      <Typography
        variant="button"
        fontSize={fontSize}
        sx={{
          backgroundColor: 'blue', backgroundImage, borderTopLeftRadius: borderRadius, borderBottomLeftRadius: borderRadius,
        }}
        width="18rem"
        textAlign="center"
      >
        {names.home}
      </Typography>
      <Typography
        fontSize={fontSize}
        variant="button"
        sx={{ backgroundColor: 'blue', backgroundImage }}
        width="4rem"
        textAlign="center"
      >
        {state.home.score}
      </Typography>
      <Typography fontSize={fontSize} sx={{ backgroundColor: 'rgb(20, 20, 20)', backgroundImage }} width="10rem" textAlign="center" variant="button">
        {`Race to ${raceTo}`}
      </Typography>
      <Typography
        fontSize={fontSize}
        variant="button"
        sx={{ backgroundColor: 'red', backgroundImage }}
        width="4rem"
        textAlign="center"
      >
        {state.guest.score}
      </Typography>
      <Typography
        fontSize={fontSize}
        variant="button"
        sx={{
          backgroundColor: 'red', backgroundImage, borderTopRightRadius: borderRadius, borderBottomRightRadius: borderRadius,
        }}
        width="18rem"
        textAlign="center"
      >
        {names.guest}
      </Typography>
    </Stack>
  );
}
