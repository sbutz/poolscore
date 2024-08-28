import {
  Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider,
  FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography,
} from '@mui/material';
import {
  AddCircleOutline, Delete, Edit, EmojiEvents, Group, SportsSoccer,
} from '@mui/icons-material';
import { ElementType, useState } from 'react';
import { dummyGame, dummyMatchday } from '../../lib/Fixture';
import { Mode } from '../../lib/GameModes';
import { Game } from '../../lib/Game';
import AlertDialog from '../../components/AlertDialog';
import { Matchday } from '../../lib/Matchday';

const matchday = dummyMatchday;

interface FormDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
}
function FormDialog({ open, title, onClose }: FormDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField variant="standard" fullWidth />
      </DialogContent>
    </Dialog>
  );
}

interface FormCardProps {
  Icon: ElementType;
  label: string;
  value: string;
  onEdit?: () => void;
  onDelete?: () => void;
}
function FormCard({
  Icon, label, value, onEdit = undefined, onDelete = undefined,
}: FormCardProps) {
  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between" p={2} spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Icon color="disabled" />
          <Typography color="text.disabled">{label}</Typography>
        </Stack>
        <Typography component="div" sx={{ flexGrow: 1 }}>{value}</Typography>
        {onEdit ? <IconButton onClick={onEdit}><Edit /></IconButton> : null}
        {onDelete ? <IconButton onClick={onDelete}><Delete /></IconButton> : null}
      </Stack>
    </Card>
  );
}

interface NameCardProps {
  label: string;
  value: string;
}
function NameCard({ label, value }: NameCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FormCard Icon={Group} label={label} value={value} onEdit={() => setOpen(true)} />
      <FormDialog open={open} onClose={() => setOpen(false)} title={label} />
    </>
  );
}

function gameToLabel(game: Game) {
  const target = game.mode === Mode.Straight ? 'Punkte' : 'Gewinnspiele';
  return `${Mode.toString(game.mode)} - (${game.raceTo} ${target})`;
}

function gameToValue(game: Game) {
  const { names, state } = game;
  return `${names.home} ${state.home.score} : ${state.guest.score} ${names.guest}`;
}

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
function GameDialog({
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

function GameCard({ game }: { game: Game }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <>
      <FormCard
        Icon={SportsSoccer}
        label={gameToLabel(game)}
        value={gameToValue(game)}
        onEdit={() => setOpenEdit(true)}
        onDelete={() => setOpenDelete(true)}
      />
      <GameDialog title="Partie bearbeiten" open={openEdit} onClose={() => setOpenEdit(false)} game={game} />
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

function AddCard() {
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

function ScoreCard({ matchday }: { matchday: Matchday }) {
  return (
    <FormCard
      Icon={EmojiEvents}
      label="Spielstand"
      value={`${Matchday.getScore(matchday, 'home')} : ${Matchday.getScore(matchday, 'guest')}`}
    />
  );
}

export default function Matchdays() {
  return (
    <Stack spacing={2}>
      <Divider sx={{ color: 'text.secondary' }}>Allgemein</Divider>
      <NameCard label="Heimmannschaft" value={matchday.names.home} />
      <NameCard label="Gastmannschaft" value={matchday.names.guest} />
      <Divider sx={{ color: 'text.secondary' }}>Partien</Divider>
      {[matchday.games.map((game) => <GameCard key={game.id} game={game} />)]}
      <AddCard />
      <Divider sx={{ color: 'text.secondary' }}>Spielstand</Divider>
      <ScoreCard matchday={matchday} />
    </Stack>
  );
}
