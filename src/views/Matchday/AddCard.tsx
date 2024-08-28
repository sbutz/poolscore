import { useState } from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import { Button, Card, Stack } from '@mui/material';
import GameDialog from './GameDialog';
import { dummyGame } from '../../lib/Fixture';

export default function AddCard() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card>
        <Stack direction="row" alignItems="center" justifyContent="center" p={1}>
          <Button startIcon={<AddCircleOutline />} onClick={() => setOpen(true)}>
            Partie hinzufügen
          </Button>
        </Stack>
      </Card>
      <GameDialog title="Neue Partie" open={open} onClose={() => setOpen(false)} game={dummyGame} />
    </>
  );
}
