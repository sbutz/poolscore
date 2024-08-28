import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel,
  MenuItem, Select, Stack, TextField,
} from '@mui/material';
import { Mode } from '../../lib/GameModes';
import { Game } from '../../lib/Game';

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
  onClose: () => void;
  title: string;
}

export default function GameDialog({
  open, onClose, game, title,
}: GameDialogProps) {
  const raceToLabel = game.mode === Mode.Straight ? 'Punkte' : 'Gewinnspiele';
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} m={1}>
          <ModeSelect mode={game.mode} setMode={() => {}} />
          <TextField variant="standard" type="number" fullWidth label={raceToLabel} value={game.raceTo} />
          <TextField variant="standard" fullWidth label="Spieler (Heim)" value={game.names.home} />
          <TextField variant="standard" fullWidth label="Spieler (Gast)" value={game.names.guest} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Abbrechen</Button>
        <Button onClick={onClose}>Speichern</Button>
      </DialogActions>
    </Dialog>
  );
}
