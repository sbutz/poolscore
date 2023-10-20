import { Stack } from '@mui/material';
import Layout from '../components/Layout';

import Packages from '../assets/licenses.json';
import ThirdPartyCard from '../components/ThirdPartyCard';

export default function ThirdParty() {
  const list = Packages.map((p) => (
    <ThirdPartyCard
      name={p.name}
      email={p.email}
      key={p.name}
      license={p.license}
      licenseText={p.licenseText}
      publisher={p.publisher}
      source={p.source}
    />
  ));

  return (
    <Layout title="Third Party Libraries">
      <Stack spacing={3}>
        {list}
      </Stack>
    </Layout>
  );
}
