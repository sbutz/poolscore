import { Stack } from '@mui/material';
import { Game } from '../../lib/Game';
import { useGames } from '../../store/Matchday';
import GameCard from './GameCard';

export default function Games() {
  const [values, loading] = useGames();

  return (
    <Stack spacing={3}>
      {loading ? <p>Partien werden geladen ...</p> : null}
      {values
        ? values.map((game: Game) => <GameCard key={game.id} game={game} />)
        : null}
      {!loading && values && values.length === 0
        ? <p>Bisher sind keine Partien angelegt.</p> : null}
    </Stack>
  );
}
