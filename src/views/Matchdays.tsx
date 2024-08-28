import {
  Box, Button, Card, CardActions, CardContent, Fab, Stack, Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Add, Edit, PictureInPicture } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Matchday } from '../lib/Matchday';
import { dummyMatchday } from '../lib/Fixture';

function MatchdayCard({ matchday }: { matchday: Matchday }) {
  const { id, names } = matchday;
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Typography color="text.secondary" mb={3} />
        </Stack>

        <Grid container spacing={2}>
          <Grid xs={5.5}>
            <Stack direction={{ xs: 'column-reverse', md: 'column-reverse' }} spacing={{ xs: 0, md: 0 }} justifyContent="center" textAlign="center">
              <Typography variant="overline" fontSize="0.85rem">{names.home}</Typography>
              <Typography variant="h4">{Matchday.getScore(matchday, 'home')}</Typography>
            </Stack>
          </Grid>
          <Grid xs={1} textAlign="center">
            <Typography variant="h4" color="text.secondary">-</Typography>
          </Grid>
          <Grid xs={5.5}>
            <Stack direction={{ xs: 'column', md: 'column' }} spacing={{ xs: 0, md: 0 }} justifyContent="center" textAlign="center">
              <Typography variant="h4">{Matchday.getScore(matchday, 'guest')}</Typography>
              <Typography variant="overline" fontSize="0.85rem">{names.guest}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          startIcon={<Edit />}
          component={Link}
          to={`/matchdays/${id}`}
        >
          Bearbeiten
        </Button>
        <Button
          startIcon={<PictureInPicture />}
          component={Link}
          to="/overlay"
        >
          Stream Overlay
        </Button>
      </CardActions>
    </Card>
  );
}

const matchdays = [dummyMatchday, dummyMatchday, dummyMatchday];

export default function Matchdays() {
  return (
    <Stack spacing={3}>
      {matchdays.map((matchday: Matchday) => (
        <MatchdayCard key={matchday.id} matchday={matchday} />))}
      <Box sx={{
        position: 'fixed', bottom: 0, right: 0, padding: '1rem',
      }}
      >
        <Fab variant="extended" color="secondary" aria-label="add" component={Link} to="/matchdays/new">
          <Add />
          Neuer Spieltag
        </Fab>
      </Box>
    </Stack>
  );
}
