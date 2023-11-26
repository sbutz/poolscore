import {
  Box, Button, Stack, Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';
import Layout from '../components/HomeLayout';

export default function Homepage() {
  return (
    <Layout>
      <Stack textAlign="center" height="70vh" justifyContent="center">
        <Typography variant="h3">POOLSCORE</Typography>
        <Typography variant="h2">Das digitale Scoreboard</Typography>
        <Box mt={4}>
          <Button variant="contained" size="large" component={Link} to="/game">Zur App</Button>
        </Box>
      </Stack>
    </Layout>
  );
}
