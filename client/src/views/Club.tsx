import { Stack, TextField } from '@mui/material';

import Layout from '../components/Layout';
import { useClub } from '../store/ClubProvider';

export default function Club() {
  const { name, setName } = useClub();

  return (
    <Layout title="Verein">
      <Stack spacing={3}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Stack>
    </Layout>
  );
}
