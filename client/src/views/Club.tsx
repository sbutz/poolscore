import { Stack } from '@mui/material';
import { useClub } from '../store/ClubProvider';
import FormField from '../components/FormField';
import Layout from '../components/HomeLayout';

export default function Club() {
  const { name, logo, setLogo } = useClub();

  return (
    <Layout>
      <Stack>
        <FormField disabled label="Name" type="text" value={name || ''} />
        <FormField
          label="Logo"
          type="image"
          value={logo || ''}
          onChange={setLogo}
        />
      </Stack>
    </Layout>
  );
}
