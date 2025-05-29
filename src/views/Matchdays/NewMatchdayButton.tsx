import { Add } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import SelectDialog from '../../components/SelectDialog';
import { useCreateMatchday } from '../../store/Matchday';
import { League } from '../../lib/Matchday';

export default function NewMatchdayButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const createMatchday = useCreateMatchday();

  const onClick = async () => {
    setOpen(true);
  };
  const onAccept = async (newValue: League) => {
    const id = await createMatchday(newValue);
    navigate(`/matchdays/${id}`);
    setOpen(false);
  };
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Box sx={{
      position: 'fixed', bottom: 0, right: 0, padding: '1rem',
    }}
    >
      <Fab variant="extended" color="secondary" onClick={onClick}>
        <Add />
        Neuer Spieltag
      </Fab>
      <SelectDialog
        open={open}
        title="Liga auswählen"
        value={League.OBERLIGA}
        items={[League.OBERLIGA, League.LANDESLIGA]}
        onCancel={onCancel}
        onAccept={onAccept}
      />
    </Box>
  );
}
