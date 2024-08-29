import { Button } from '@mui/material';
import { Undo } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Action, Mode, reducer } from '../../lib/GameModes';
import Game14 from './Game14';
import Game8 from './Game8';
import Layout from './GameLayout';
import { State as State8 } from '../../lib/GameState';
import { State as State14 } from '../../lib/GameState14';
import { useGame, useUpdateGame } from '../../store/Matchday';
import { Game } from '../../lib/Game';
import GameFinished from './GameFinished';
import AlertDialog from '../../components/AlertDialog';

export default function MatchdayGame() {
  const { id } = useParams();
  const [game, loading, error] = useGame(id);
  const updateGame = useUpdateGame();
  const [lastAction, setLastAction] = useState<Action | undefined>(undefined);

  const updateState = async (action: Action) => {
    if (!game) throw Error('No game');
    const newState = reducer(game.mode, game.state, action);
    const newGame = { ...game, state: newState };
    if (Game.isFinished(newGame) && lastAction === undefined) {
      setLastAction(action);
    } else {
      await updateGame(newGame);
    }
  };

  const renderGame = (g: Game) => {
    const { names, mode, state } = g;
    if (Game.isFinished(g)) {
      return <GameFinished game={g} />;
    }
    return mode === Mode.Straight
      ? <Game14 names={names} state={state as State14} dispatch={updateState} />
      : <Game8 names={names} state={state as State8} dispatch={updateState} />;
  };

  const toolbar = (
    <Button
      color="inherit"
      startIcon={<Undo />}
      onClick={() => updateState({ type: 'ROLLBACK' })}
    >
      Rückgängig
    </Button>
  );

  return (
    <Layout requireDesktop fullwidth toolbar={toolbar}>
      {error ? <p>Fehler beim Laden der Partie.</p> : null}
      {!error && loading ? <p>Partie wird geladen ...</p> : null}
      {game ? renderGame(game) : null}
      <AlertDialog
        open={lastAction !== undefined}
        title="Spiel beenden"
        text="Wollen Sie das Spiel wirklich beenden?"
        cancelText="Abbrechen"
        onCancel={() => { setLastAction(undefined); }}
        acceptText="Ok"
        onAccept={async () => {
          if (!lastAction) throw Error('No last action');
          await updateState(lastAction);
          setLastAction(undefined);
        }}
      />
    </Layout>
  );
}
