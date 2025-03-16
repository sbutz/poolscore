import { useEffect, useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel,
  MenuItem, Select, Stack, TextField,
} from '@mui/material';
import { getInitialState, Mode } from '../../lib/GameModes';
import { Game } from '../../lib/Game';
import usePreviousValue from '../../util/usePreviousValue';

interface ModeSelectProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

function ModeSelect({ mode, setMode } : ModeSelectProps) {
  const handleChange = (event: any) => {
    setMode(event.target.value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel>Disziplin</InputLabel>
      <Select
        value={mode}
        label="Disziplin"
        onChange={handleChange}
      >
        {[Mode.Straight, Mode.Ball8, Mode.Ball9, Mode.Ball10].map((m) => (
          <MenuItem key={m} value={m}>{Mode.toString(m)}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

interface GameDialogProps {
  game: Game;
  open: boolean;
  title: string;
  onCancel: () => void;
  onAccept: (game: Game) => Promise<void>;
}

export default function GameDialog({
  open, game, title, onCancel, onAccept,
}: GameDialogProps) {
  const [newGame, setNewGame] = useState(game);

  const previousOpen = usePreviousValue(open);
  useEffect(() => {
    if (open && !previousOpen) {
      setNewGame(game);
    }
  }, [open, previousOpen, game]);

  const onModeChange = (mode: Mode) => {
    setNewGame({ ...newGame, mode, state: getInitialState(mode) });
  };
  const onRaceToChange = (raceTo: number) => {
    if (!Number.isNaN(raceTo) && raceTo > 0) setNewGame({ ...newGame, raceTo });
  };
  const onNameHomeChange = (name: string) => {
    setNewGame({ ...newGame, names: { ...newGame.names, home: name } });
  };
  const onNameGuestChange = (name: string) => {
    setNewGame({ ...newGame, names: { ...newGame.names, guest: name } });
  };

  const raceToLabel = newGame.mode === Mode.Straight ? 'Punkte' : 'Gewinnspiele';
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} m={1}>
          <ModeSelect mode={newGame.mode} setMode={onModeChange} />
          <TextField
            variant="standard"
            fullWidth
            label={raceToLabel}
            type="number"
            value={newGame.raceTo}
            onChange={(e) => onRaceToChange(parseInt(e.target.value, 10))}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            variant="standard"
            fullWidth
            label="Spieler (Heim)"
            value={newGame.names.home}
            onChange={(e) => onNameHomeChange(e.target.value)}
          />
          <TextField
            variant="standard"
            fullWidth
            label="Spieler (Gast)"
            value={newGame.names.guest}
            onChange={(e) => onNameGuestChange(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Abbrechen</Button>
        <Button onClick={() => onAccept(newGame)}>Speichern</Button>
      </DialogActions>
    </Dialog>
  );
}
