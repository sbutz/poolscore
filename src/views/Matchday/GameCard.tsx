import { useState } from 'react';
import { Game } from '../../lib/Game';
import { Mode } from '../../lib/GameModes';
import AlertDialog from '../../components/AlertDialog';
import FormCard from './FormCard';
import GameDialog from './GameDialog';
import EightBallIcon from '../../assets/EightBall';
import NineBallIcon from '../../assets/NineBall';
import TenBallIcon from '../../assets/TenBall';
import PoolRackIcon from '../../assets/StraightPool';
import { State as State14 } from '../../lib/GameState14';

function gameToLabel(game: Game) {
  const target = game.mode === Mode.Straight ? 'Punkte' : 'Gewinnspiele';
  return `${Mode.toString(game.mode)} - (${game.raceTo} ${target})`;
}

function gameToValue(game: Game) {
  const { names, state } = game;
  return `${names.home} ${state.home.score}:${state.guest.score} ${names.guest}`;
}

function gameToDetails(game: Game) {
  if (game.mode === Mode.Straight) {
    const state = game.state as State14;
    const runsHome = state.home.runs.length;
    const runsGuest = state.guest.runs.length;
    const highestHome = state.home.highestScore;
    const highestGuest = state.guest.highestScore;
    return `AN: ${runsHome}:${runsGuest} HS: ${highestHome}:${highestGuest}`;
  }
}

function gameToIcon(game: Game) {
  if (game.mode === Mode.Straight) {
    return PoolRackIcon;
  }
  if (game.mode === Mode.Ball9) {
    return NineBallIcon;
  }
  if (game.mode === Mode.Ball10) {
    return TenBallIcon;
  }
  return EightBallIcon;
}

interface GameCardProps {
  game: Game;
  onEdit: (game: Game) => Promise<void>;
}
export default function GameCard({ game, onEdit }: GameCardProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const onAccept = async (g: Game) => {
    await onEdit(g);
    setOpenEdit(false);
  };

  return (
    <>
      <FormCard
        Icon={gameToIcon(game)}
        label={gameToLabel(game)}
        value={gameToValue(game)}
        details={gameToDetails(game)}
        onEdit={() => setOpenEdit(true)}
        onDelete={() => setOpenDelete(true)}
      />
      <GameDialog
        title="Partie bearbeiten"
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        onAccept={onAccept}
        game={game}
      />
      <AlertDialog
        open={openDelete}
        title="Partie löschen"
        text="Soll die Partie wirklich gelöscht werden?"
        cancelText="Abbrechen"
        onCancel={() => setOpenDelete(false)}
        acceptText="Löschen"
        onAccept={() => setOpenDelete(false)}
      />
    </>
  );
}
