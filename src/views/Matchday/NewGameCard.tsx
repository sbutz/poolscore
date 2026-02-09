import { useState } from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import { Button, Card, Stack } from '@mui/material';
import GameDialog from './GameDialog';
import { Game } from '../../lib/Game';
import { Mode } from '../../lib/GameModes';

interface NewGameCardProps {
  createGame: (game: Game) => Promise<void>;
}

export default function NewGameCard({ createGame }: NewGameCardProps) {
  const [open, setOpen] = useState(false);

  const onAccept = async (game: Game) => {
    await createGame(game);
    setOpen(false);
  };
  const onCancel = () => setOpen(false);

  return (
    <>
      <Card>
        <Stack direction="row" alignItems="center" justifyContent="center" p={1}>
          <Button startIcon={<AddCircleOutline />} onClick={() => setOpen(true)}>
            Partie hinzufügen
          </Button>
        </Stack>
      </Card>
      <GameDialog
        title="Neue Partie"
        open={open}
        onCancel={onCancel}
        onAccept={onAccept}
        game={Game.create(Mode.Ball8, 5)}
      />
    </>
  );
}
