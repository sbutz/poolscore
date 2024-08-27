import {
  Button, Card, Divider, Stack, Typography,
} from '@mui/material';
import {
  AddCircleOutline, Delete, Edit, EmojiEvents, Group, SportsSoccer,
} from '@mui/icons-material';
import { ElementType } from 'react';

const matchday = { id: '1', names: { home: 'Team Niederbayern', guest: 'Team Tirol' }, games: [] };

interface FormCardProps {
  Icon: ElementType;
  label: string;
  value: string;
  editable?: boolean;
  deleteable?: boolean;
}
function FormCard({
  Icon, label, value, editable = false, deleteable = false,
}: FormCardProps) {
  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between" p={2} spacing={3}>
        <Stack direction="row" spacing={2}>
          <Icon color="disabled" />
          <Typography color="text.disabled">{label}</Typography>
        </Stack>
        <Typography component="div" sx={{ flexGrow: 1 }}>{value}</Typography>
        {editable ? <Edit /> : null}
        {deleteable ? <Delete /> : null}
      </Stack>
    </Card>
  );
}

function AddCard() {
  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="center" p={1}>
        <Button startIcon={<AddCircleOutline />}>
          Partie hinzufügen
        </Button>
      </Stack>
    </Card>
  );
}

export default function Matchdays() {
  return (
    <Stack spacing={2}>
      <Divider>Allgemein</Divider>
      <FormCard Icon={Group} label="Heimmannschaft" editable value={matchday.names.home} />
      <FormCard Icon={Group} label="Gastmannschaft" editable value={matchday.names.guest} />
      <Divider>Partien</Divider>
      <FormCard Icon={SportsSoccer} label="1. Spiel" editable deleteable value="14/1 endlos - (70 Bälle)" />
      <FormCard Icon={SportsSoccer} label="2. Spiel" editable deleteable value="8-Ball - (5 Gewinnspiele)" />
      <FormCard Icon={SportsSoccer} label="3. Spiel" editable deleteable value="9-Ball - (7 Gewinnspiele)" />
      <FormCard Icon={SportsSoccer} label="4. Spiel" editable deleteable value="10-Ball - (6 Gewinnspiele)" />
      <FormCard Icon={SportsSoccer} label="5. Spiel" editable deleteable value="8-Ball - (5 Gewinnspiele)" />
      <FormCard Icon={SportsSoccer} label="6. Spiel" editable deleteable value="8-Ball - (5 Gewinnspiele)" />
      <FormCard Icon={SportsSoccer} label="7. Spiel" editable deleteable value="8-Ball - (5 Gewinnspiele)" />
      <FormCard Icon={SportsSoccer} label="8. Spiel" editable deleteable value="8-Ball - (5 Gewinnspiele)" />
      <FormCard Icon={SportsSoccer} label="9. Spiel" editable deleteable value="8-Ball - (5 Gewinnspiele)" />
      <FormCard Icon={SportsSoccer} label="10. Spiel" editable deleteable value="8-Ball - (5 Gewinnspiele)" />
      <AddCard />
      <Divider>Spielstand</Divider>
      <FormCard Icon={EmojiEvents} label="Spielstand" value="5 : 3" />
    </Stack>
  );
}
