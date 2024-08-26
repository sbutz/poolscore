import { Box, Stack, Typography } from '@mui/material';
import { Game } from '../lib/Game';
import { getInitialState, Mode } from '../lib/GameModes';
import { Matchday } from '../lib/Matchday';
import { ReactComponent as BC73 } from '../assets/bc73_transparent.svg';

const borderRadius = '0.25rem';
const backgroundImage = 'linear-gradient(180deg, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.15) 50%)';

const dummyMatchday : Matchday = {
  id: '1',
  names: {
    home: 'NBay',
    guest: 'Tirol',
  },
  games: [],
};

const dummyGame: Game = {
  id: '1',
  names: {
    home: 'Stefan Wimmer',
    guest: 'Manuel Plattner',
  },
  mode: Mode.Ball9,
  raceTo: 3,
  state: getInitialState(Mode.Ball9),
};

function MatchScore(matchday: Matchday) {
  const { games, names } = matchday;
  const firstTo = games.length / 2 + 1;

  return (
    <Stack direction="row" spacing={1} sx={{ backgroundImage }}>
      <Stack direction="row" sx={{ color: 'white' }}>
        <Typography
          variant="button"
          sx={{
            backgroundColor: 'blue', borderTopLeftRadius: borderRadius, borderBottomLeftRadius: borderRadius, backgroundImage,
          }}
          width="4rem"
          textAlign="center"
        >
          {names.home}
        </Typography>
        <Typography sx={{ backgroundColor: 'rgb(20, 20, 20)', backgroundImage }} width="3rem" textAlign="center" variant="button">
          {Matchday.getScore(matchday, 'home')}
          {' - '}
          {Matchday.getScore(matchday, 'guest')}
        </Typography>
        <Typography
          variant="button"
          sx={{
            backgroundColor: 'red', borderTopRightRadius: borderRadius, borderBottomRightRadius: borderRadius, backgroundImage,
          }}
          width="4rem"
          textAlign="center"
        >
          {names.guest}
        </Typography>
      </Stack>
      <Typography sx={{ color: 'black', backgroundColor: 'white', borderRadius }} width="8rem" textAlign="center">
        {`First to ${firstTo} points`}
      </Typography>
    </Stack>
  );
}

function GameScore({ names, raceTo, state }: Game) {
  return (
    <Stack direction="row" spacing={0} sx={{ backgroundImage, color: 'white' }}>
      <Typography
        variant="button"
        sx={{
          backgroundColor: 'blue', backgroundImage, borderTopLeftRadius: borderRadius, borderBottomLeftRadius: borderRadius,
        }}
        width="18rem"
        textAlign="center"
      >
        {names.home}
      </Typography>
      <Typography
        variant="button"
        sx={{ backgroundColor: 'blue', backgroundImage }}
        width="4rem"
        textAlign="center"
      >
        {state.home.score}
      </Typography>
      <Typography sx={{ backgroundColor: 'rgb(20, 20, 20)', backgroundImage }} width="6rem" textAlign="center" variant="button">
        {`Race to ${raceTo}`}
      </Typography>
      <Typography
        variant="button"
        sx={{ backgroundColor: 'red', backgroundImage }}
        width="4rem"
        textAlign="center"
      >
        {state.guest.score}
      </Typography>
      <Typography
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

export default function StreamOverlay() {
  return (
    <Stack height="100vh" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
      <Box
        sx={{
          position: 'fixed', top: 0, left: 0, margin: '2rem',
        }}
      >
        { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
        <MatchScore {...dummyMatchday} />
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
        <BC73 fill="0xffffff" stroke="white" width="5rem" height="5rem" opacity={0.7} />
      </Box>
      <Stack
        alignItems="center"
        width="100%"
        sx={{ position: 'fixed', bottom: '2rem' }}
      >
        { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
        <GameScore {...dummyGame} />
      </Stack>
    </Stack>
  );
}
