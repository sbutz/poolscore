import { Stack } from '@mui/material';
import { Matchday } from '../../lib/Matchday';
import MatchdayCard from './MatchdayCard';
import NewMatchdayButton from './NewMatchdayButton';
import { useMatchdays } from '../../store/Matchday';

export default function Matchdays() {
  const [values, loading] = useMatchdays();

  return (
    <Stack spacing={3}>
      {loading ? <p>Spieltage werden geladen ...</p> : null}
      {values
        ? values.map((matchday: Matchday) => <MatchdayCard key={matchday.id} matchday={matchday} />)
        : null}
      {!loading && values && values.length === 0
        ? <p>Bisher sind keine Spieltage angelegt.</p> : null}
      <NewMatchdayButton />
    </Stack>
  );
}
