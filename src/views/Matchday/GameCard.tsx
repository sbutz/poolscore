import { useState } from 'react';
import { SportsSoccer } from '@mui/icons-material';
import { Game } from '../../lib/Game';
import { Mode } from '../../lib/GameModes';
import AlertDialog from '../../components/AlertDialog';
import FormCard from './FormCard';
import GameDialog from './GameDialog';

function gameToLabel(game: Game) {
  const target = game.mode === Mode.Straight ? 'Punkte' : 'Gewinnspiele';
  return `${Mode.toString(game.mode)} - (${game.raceTo} ${target})`;
}

function gameToValue(game: Game) {
  const { names, state } = game;
  return `${names.home} ${state.home.score} : ${state.guest.score} ${names.guest}`;
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
        Icon={SportsSoccer}
        label={gameToLabel(game)}
        value={gameToValue(game)}
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
