import { Divider, Stack } from '@mui/material';
import { useParams } from 'react-router';
import {
  useMatchday, useUpdateGame, useUpdateMatchday,
} from '../../store/Matchday';
import NameCard from './NameCard';
import GameCard from './GameCard';
import ScoreCard from './ScoreCard';
import DateCard from './DateCard';
import LeagueCard from './LeagueCard';

export default function Matchday() {
  const { id } = useParams();
  const [matchday] = useMatchday(id);
  const updateMatchday = useUpdateMatchday();
  const updateGame = useUpdateGame();

  const onDateChange = async (newValue: Date) => {
    if (!matchday) return;
    const newMatchday = { ...matchday, date: newValue };
    await updateMatchday(newMatchday);
  };

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
      <LeagueCard label="Liga" value={matchday.league} />
      <DateCard label="Datum" value={matchday.date} onChange={onDateChange} />
      <NameCard label="Heimmannschaft" value={matchday.names.home} onChange={onNameHomeChange} />
      <NameCard label="Gastmannschaft" value={matchday.names.guest} onChange={onNameGuestChange} />
      <Divider sx={{ color: 'text.secondary' }}>1. Runde</Divider>
      {[matchday.games.slice(0, 4).map((game) => (
        <GameCard key={game.id} game={game} onEdit={updateGame} />
      ))]}
      <Divider sx={{ color: 'text.secondary' }}>2. Runde</Divider>
      {[matchday.games.slice(4, 6).map((game) => (
        <GameCard key={game.id} game={game} onEdit={updateGame} />
      ))]}
      <Divider sx={{ color: 'text.secondary' }}>3. Runde</Divider>
      {[matchday.games.slice(6, 10).map((game) => (
        <GameCard key={game.id} game={game} onEdit={updateGame} />
      ))]}
      <Divider sx={{ color: 'text.secondary' }}>Spielstand</Divider>
      <ScoreCard matchday={matchday} />
    </Stack>
  );
}
