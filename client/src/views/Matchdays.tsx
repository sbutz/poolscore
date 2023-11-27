import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  Box, Button, Card, CardActions, CardContent, Chip, Stack, Typography,
} from '@mui/material';
import {
  Add, Delete, Edit, Tv,
} from '@mui/icons-material';

import Layout from '../components/HomeLayout';
import { Context, generateId } from '../store/Store';
import { Matchday } from '../store/MatchdayState';

function MatchdayCard({
  startTime, league, teams, points, winner, id,
}: Matchday) {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary">
          {`${dayjs(startTime).format('DD.MM.YYYY')} (${league})`}
        </Typography>
        <Stack direction="row" spacing={5} alignItems="center">
          <Typography variant="h6">
            {`${teams.home} - ${teams.guest}`}
          </Typography>
          <Chip
            label={winner === 'home' ? 'Sieg' : 'Niederlage'}
            color={winner === 'home' ? 'success' : 'error'}
            size="small"
          />
        </Stack>
        <Typography>
          {`${points.home} - ${points.guest}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" startIcon={<Tv />}>Live-Score</Button>
        <Button
          component={Link}
          to={`/matchday/${id}`}
          color="primary"
          startIcon={<Edit />}
        >
          Bearbeiten
        </Button>
        <Button color="primary" startIcon={<Delete />}>Löschen</Button>
      </CardActions>
    </Card>
  );
}

export default function Matchdays() {
  const state = useContext(Context)[0];
  const navigate = useNavigate();

  return (
    <Layout>
      <Stack spacing={3}>
        <Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              navigate(`/matchday/${generateId()}`);
            }}
          >
            Neuer Spieltag
          </Button>
        </Box>
        {state.matchdays.length === 0
          ? (
            <Typography>
              Du hast noch keine Spieltage angelegt.
            </Typography>
          ) : null }
        {state.matchdays.map((m) => (
          <MatchdayCard
            key={m.id}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...m}
          />
        ))}
      </Stack>
    </Layout>
  );
}
