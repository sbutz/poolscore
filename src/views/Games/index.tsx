import { Stack } from '@mui/material';
import { Game } from '../../lib/Game';
import { useGames } from '../../store/Matchday';
import GameCard from './GameCard';

export default function Games() {
  const [values, loading] = useGames();
  const games = values?.filter((game: Game) => Game.isReady(game) || Game.isRunning(game)) || [];

  return (
    <Stack spacing={3}>
      {loading ? <p>Partien werden geladen ...</p> : null}
      {games
        ? games.map((game: Game) => <GameCard key={game.id} game={game} />)
        : null}
      {!loading && games && games.length === 0
        ? <p>Bisher sind keine Partien spielbereit.</p> : null}
    </Stack>
  );
}
