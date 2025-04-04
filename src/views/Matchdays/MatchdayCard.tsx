import {
  Button, Card, CardActions, CardContent, Stack, Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Edit, PictureInPicture } from '@mui/icons-material';
import { Link } from 'react-router';
import dayjs from 'dayjs';
import { Matchday } from '../../lib/Matchday';

export default function MatchdayCard({ matchday }: { matchday: Matchday }) {
  const { id, names, date } = matchday;
  return (
    <Card>
      <CardContent>
        <Stack direction="row-reverse" spacing={1} sx={{ mb: 3 }}>
          <Typography fontSize="0.85rem">{dayjs(date).format('DD.MM.YYYY')}</Typography>
        </Stack>

        <Grid container spacing={2}>
          <Grid size={5.5}>
            <Stack direction={{ xs: 'column-reverse', md: 'column-reverse' }} spacing={{ xs: 0, md: 0 }} justifyContent="center" textAlign="center">
              <Typography variant="overline" fontSize="0.85rem">{names.home}</Typography>
              <Typography variant="h4">{Matchday.getScore(matchday, 'home')}</Typography>
            </Stack>
          </Grid>
          <Grid size={1} textAlign="center">
            <Typography variant="h4" color="text.secondary">-</Typography>
          </Grid>
          <Grid size={5.5}>
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
