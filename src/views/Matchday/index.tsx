import { Divider, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  useCreateGame, useMatchday, useUpdateGame, useUpdateMatchday,
} from '../../store/Matchday';
import NameCard from './NameCard';
import GameCard from './GameCard';
import ScoreCard from './ScoreCard';
import NewGameCard from './NewGameCard';
import { Game } from '../../lib/Game';

export default function Matchdays() {
  const { id } = useParams();
  const [matchday] = useMatchday(id);
  const updateMatchday = useUpdateMatchday();
  const createGame = useCreateGame();
  const updateGame = useUpdateGame();

  const onNameHomeChange = async (newValue: string) => {
    if (!matchday) return;
    const newMatchday = { ...matchday, names: { ...matchday.names, home: newValue } };
    await updateMatchday(newMatchday);
  };

  const onNameGuestChange = async (newValue: string) => {
    if (!matchday) return;
    const newMatchday = { ...matchday, names: { ...matchday.names, guest: newValue } };
    await updateMatchday(newMatchday);
  };

  const onGameAdd = async (game: Game) => {
    if (matchday) await createGame(game, matchday);
  };

  if (!matchday) { return <p>Lade Spieltag ...</p>; }
  return (
    <Stack spacing={2}>
      <Divider sx={{ color: 'text.secondary' }}>Allgemein</Divider>
      <NameCard label="Heimmannschaft" value={matchday.names.home} onChange={onNameHomeChange} />
      <NameCard label="Gastmannschaft" value={matchday.names.guest} onChange={onNameGuestChange} />
      <Divider sx={{ color: 'text.secondary' }}>Partien</Divider>
      {[matchday.games.map((game) => (
        <GameCard key={game.id} game={game} onEdit={updateGame} />
      ))]}
      <NewGameCard createGame={onGameAdd} />
      <Divider sx={{ color: 'text.secondary' }}>Spielstand</Divider>
      <ScoreCard matchday={matchday} />
    </Stack>
  );
}
