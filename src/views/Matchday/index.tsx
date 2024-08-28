import { Divider, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMatchday, useUpdateMatchday } from '../../store/Matchday';
import NameCard from './NameCard';
import GameCard from './GameCard';
import ScoreCard from './ScoreCard';
import AddCard from './AddCard';

export default function Matchdays() {
  const { id } = useParams();
  const [matchday] = useMatchday(id);
  const updateMatchday = useUpdateMatchday();

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

  if (!matchday) { return <p>Lade Spieltag ...</p>; }
  return (
    <Stack spacing={2}>
      <Divider sx={{ color: 'text.secondary' }}>Allgemein</Divider>
      <NameCard label="Heimmannschaft" value={matchday.names.home} onChange={onNameHomeChange} />
      <NameCard label="Gastmannschaft" value={matchday.names.guest} onChange={onNameGuestChange} />
      <Divider sx={{ color: 'text.secondary' }}>Partien</Divider>
      {[matchday.games.map((game) => <GameCard key={game.id} game={game} />)]}
      <AddCard />
      <Divider sx={{ color: 'text.secondary' }}>Spielstand</Divider>
      <ScoreCard matchday={matchday} />
    </Stack>
  );
}
