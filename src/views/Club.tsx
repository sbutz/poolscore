import { useContext } from 'react';
import { Stack, TextField } from '@mui/material';

import Layout from '../components/Layout';
import { Context } from '../store/Store';

export default function Club() {
  const state = useContext(Context)[0];

  return (
    <Layout title="Verein">
      <Stack spacing={3}>
        <TextField
          label="Name"
          disabled
          value={state.name}
        />
      </Stack>
    </Layout>
  );
}
