import { Stack } from '@mui/material';
import { Matchday } from '../../lib/Matchday';
import MatchdayCard from './MatchdayCard';
import NewMatchdayButton from './NewMatchdayButton';
import { useMatchdays } from '../../store/Matchday';

export default function Matchdays() {
  const [values, loading, error] = useMatchdays();

  return (
    <Stack spacing={3}>
      {error ? <p>Fehler beim Laden der Spieltage.</p> : null}
      {!error && loading ? <p>Spieltage werden geladen ...</p> : null}
      {values
        ? values.map((matchday: Matchday) => <MatchdayCard key={matchday.id} matchday={matchday} />)
        : null}
      {!error && !loading && !values ? <p>Bisher sind keine Spieltage angelegt.</p> : null}
      <NewMatchdayButton />
    </Stack>
  );
}
