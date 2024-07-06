import {
  SportsEsports, PlayCircleFilled, Undo,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { Mode } from '../lib/GameModes';

interface GameToolbarProps {
  mode: Mode,
  onRestart: () => void;
  onChangeMode: () => void;
  onRollback: () => void;
}

export default function GameToolbar({
  mode, onRestart, onChangeMode, onRollback,
}:GameToolbarProps) {
  return (
    <>
      <Button
        color="inherit"
        startIcon={<SportsEsports />}
        onClick={onChangeMode}
      >
        {mode === Mode.Ball8 ? '14/1 endlos' : '8/9/10 Ball'}
      </Button>
      <Button
        color="inherit"
        startIcon={<PlayCircleFilled />}
        onClick={onRestart}
      >
        Neues Spiel
      </Button>
      <Button
        color="inherit"
        startIcon={<Undo />}
        onClick={onRollback}
      >
        Rückgängig
      </Button>
    </>
  );
}
