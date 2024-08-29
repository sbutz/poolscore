import { Stack } from '@mui/material';
import { Game } from '../../lib/Game';
import { useGames } from '../../store/Matchday';
import GameCard from './GameCard';

export default function Games() {
  const [values, loading, error] = useGames();

  return (
    <Stack spacing={3}>
      {error ? <p>Fehler beim Laden der Partien.</p> : null}
      {!error && loading ? <p>Partien werden geladen ...</p> : null}
      {values
        ? values.map((game: Game) => <GameCard key={game.id} game={game} />)
        : null}
      {!error && !loading && !values ? <p>Bisher sind keine Partien angelegt.</p> : null}
    </Stack>
  );
}
