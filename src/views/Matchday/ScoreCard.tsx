import { EmojiEvents } from '@mui/icons-material';
import { Matchday } from '../../lib/Matchday';
import FormCard from './FormCard';

export default function ScoreCard({ matchday }: { matchday: Matchday }) {
  return (
    <FormCard
      Icon={EmojiEvents}
      label="Spielstand"
      value={`${Matchday.getScore(matchday, 'home')} : ${Matchday.getScore(matchday, 'guest')}`}
    />
  );
}
