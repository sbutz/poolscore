import { EmojiEvents } from '@mui/icons-material';
import FormCard from './FormCard';

interface PresetCardProps {
  label: string;
  value: string;
}

export default function LeagueCard({ label, value }: PresetCardProps) {
  return (
    <FormCard Icon={EmojiEvents} label={label} value={value} />
  );
}
