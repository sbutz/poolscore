import { Group } from '@mui/icons-material';
import { useState } from 'react';
import FormCard from './FormCard';
import FormDialog from './FormDialog';

interface NameCardProps {
  label: string;
  value: string;
  onChange: (newValue: string) => Promise<void> | void;
}

export default function NameCard({ label, value, onChange }: NameCardProps) {
  const [open, setOpen] = useState(false);
  const onAccept = async (newValue: string) => {
    await onChange(newValue);
    setOpen(false);
  };
  const onCancel = () => setOpen(false);

  return (
    <>
      <FormCard Icon={Group} label={label} value={value} onEdit={() => setOpen(true)} />
      <FormDialog open={open} title={label} value={value} onCancel={onCancel} onAccept={onAccept} />
    </>
  );
}
