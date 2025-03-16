import { Stack, Typography } from '@mui/material';
import { Matchday } from '../../lib/Matchday';

const borderRadius = '0.25rem';
const backgroundImage = 'linear-gradient(180deg, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.15) 50%)';
const fontSize = 24;

interface MatchScoreProps {
  matchday: Matchday;
}

export default function MatchScore({ matchday } : MatchScoreProps) {
  const { games, names } = matchday;
  const firstTo = Math.floor(games.length / 2) + 1;

  return (
    <Stack direction="row" spacing={1} sx={{ backgroundImage }}>
      <Stack direction="row" sx={{ color: 'white' }}>
        <Typography
          fontSize={fontSize}
          variant="button"
          sx={{
            backgroundColor: 'blue', borderTopLeftRadius: borderRadius, borderBottomLeftRadius: borderRadius, backgroundImage,
          }}
          width="6rem"
          textAlign="center"
        >
          {names.home}
        </Typography>
        <Typography fontSize={fontSize} sx={{ backgroundColor: 'rgb(20, 20, 20)', backgroundImage }} width="5rem" textAlign="center" variant="button">
          {Matchday.getScore(matchday, 'home')}
          {' - '}
          {Matchday.getScore(matchday, 'guest')}
        </Typography>
        <Typography
          fontSize={fontSize}
          variant="button"
          sx={{
            backgroundColor: 'red', borderTopRightRadius: borderRadius, borderBottomRightRadius: borderRadius, backgroundImage,
          }}
          width="6rem"
          textAlign="center"
        >
          {names.guest}
        </Typography>
      </Stack>
      <Typography variant="button" fontSize={fontSize} sx={{ color: 'black', backgroundColor: 'white', borderRadius }} width="15rem" textAlign="center">
        {`First to ${firstTo} points`}
      </Typography>
    </Stack>
  );
}
