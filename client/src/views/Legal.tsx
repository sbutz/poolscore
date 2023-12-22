import {
  Container,
  Link, Stack, Typography,
} from '@mui/material';
import Layout from '../components/HomeLayout';

export default function Legal() {
  return (
    <Layout>
      <Container>
        <Stack spacing={8}>
          <Stack spacing={2}>
            <Typography variant="h3">Impressum</Typography>
            <Typography>
              Stefan Butz
              <br />
              Berganger 7
              <br />
              84048 Mainburg
            </Typography>
            <Typography><Link href="mailto:mail@butz.st">mail@butz.st</Link></Typography>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h3">Datenschutzerklärung</Typography>
            <Typography><Link href={`${process.env.PUBLIC_URL}/privacy_policy.html`} target="_blank" rel="noopener">Datenschutzerklärung</Link></Typography>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h3">Drittanbieter Lizenzen</Typography>
            <Typography><Link href={`${process.env.PUBLIC_URL}/licenses.txt`} target="_blank" rel="noopener">Lizenzen</Link></Typography>
          </Stack>
        </Stack>
      </Container>
    </Layout>
  );
}
