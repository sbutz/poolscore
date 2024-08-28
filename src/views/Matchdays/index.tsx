import { Box, Fab, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Matchday } from '../../lib/Matchday';
import { dummyMatchday } from '../../lib/Fixture';
import MatchdayCard from './MatchdayCard';

const matchdays = [dummyMatchday, dummyMatchday, dummyMatchday];

export default function Matchdays() {
  return (
    <Stack spacing={3}>
      {matchdays.map((matchday: Matchday) => (
        <MatchdayCard key={matchday.id} matchday={matchday} />))}
      <Box sx={{
        position: 'fixed', bottom: 0, right: 0, padding: '1rem',
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
