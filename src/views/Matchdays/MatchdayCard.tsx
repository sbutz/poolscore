import {
  Button, Card, CardActions, CardContent, Stack, Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Edit, PictureInPicture } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Matchday } from '../../lib/Matchday';

export default function MatchdayCard({ matchday }: { matchday: Matchday }) {
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
          to={`/matchdays/${id}/overlay`}
        >
          Stream Overlay
        </Button>
      </CardActions>
    </Card>
  );
}
