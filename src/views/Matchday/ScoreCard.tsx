import { Functions } from '@mui/icons-material';
import { Matchday } from '../../lib/Matchday';
import FormCard from './FormCard';

export default function ScoreCard({ matchday }: { matchday: Matchday }) {
  return (
    <FormCard
      Icon={Functions}
      label="Spielstand"
      value={`${Matchday.getScore(matchday, 'home')} : ${Matchday.getScore(matchday, 'guest')}`}
    />
  );
}
