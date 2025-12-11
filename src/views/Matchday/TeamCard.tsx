import { Group } from '@mui/icons-material';
import { useState } from 'react';
import FormCard from './FormCard';
import TeamDialog from './TeamDialog';
import { Team } from '../../lib/Team';

interface TeamCardProps {
  label: string;
  value: Team;
  onChange: (newValue: Team) => Promise<void> | void;
}

export default function TeamCard({ label, value, onChange }: TeamCardProps) {
  const [open, setOpen] = useState(false);
  const onAccept = async (newValue: Team) => {
    await onChange(newValue);
    setOpen(false);
  };
  const onCancel = () => setOpen(false);

  return (
    <>
      <FormCard Icon={Group} label={label} value={value.name} onEdit={() => setOpen(true)} />
      <TeamDialog open={open} title={label} value={value} onCancel={onCancel} onAccept={onAccept} />
    </>
  );
}
