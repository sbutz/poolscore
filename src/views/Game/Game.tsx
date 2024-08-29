import { useEffect, useState } from 'react';
import { useGame } from '../../store/GameProvider';
import { Mode } from '../../lib/GameModes';
import Game14 from './Game14';
import Game8 from './Game8';
import GameToolbar from '../../components/GameToolbar';
import Layout from '../../components/GameLayout';
import { State as State8 } from '../../lib/GameState';
import { State as State14 } from '../../lib/GameState14';
import AlertDialog from '../../components/AlertDialog';

export default function Game() {
  const {
    mode, state, startNewGame, updateState,
  } = useGame();

  const [showPrompt, setShowPrompt] = useState(false);
  const [nextMode, setNextMode] = useState<Mode>(Mode.Ball8);

  useEffect(() => {
    if (mode == null) {
      startNewGame(Mode.Ball8);
    }
  });

  const toolbar = mode != null ? (
    <GameToolbar
      mode={mode}
      onRestart={() => {
        setNextMode(mode);
        setShowPrompt(true);
      }}
      onChangeMode={() => {
        setNextMode(mode === Mode.Ball8 ? Mode.Straight : Mode.Ball8);
        setShowPrompt(true);
      }}
      onRollback={() => {
        updateState({ type: 'ROLLBACK' });
      }}
    />
  ) : null;

  const dialog = (
    <AlertDialog
      open={showPrompt as boolean}
      title={mode === nextMode ? 'Neues Spiel starten' : 'Disziplin wechseln'}
      text="Der aktuelle Spielstand geht dabei verloren."
      cancelText="Abbrechen"
      onCancel={() => {
        setShowPrompt(false);
      }}
      acceptText="Ok"
      onAccept={() => {
        startNewGame(nextMode);
        setShowPrompt(false);
      }}
    />
  );

  const game = mode === Mode.Ball8
    ? (
      <Game8 state={state as State8} dispatch={updateState} />
    ) : <Game14 state={state as State14} dispatch={updateState} />;

  return (
    <Layout requireDesktop fullwidth toolbar={toolbar}>
      {game}
      {dialog}
    </Layout>
  );
}
