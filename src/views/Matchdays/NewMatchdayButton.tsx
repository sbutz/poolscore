import { Add } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';
import { useNavigate } from 'react-router';
import { useCreateMatchday } from '../../store/Matchday';

export default function NewMatchdayButton() {
  const navigate = useNavigate();
  const createMatchday = useCreateMatchday();

  const onClick = async () => {
    const id = await createMatchday();
    navigate(`/matchdays/${id}`);
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
    </Box>
  );
}
