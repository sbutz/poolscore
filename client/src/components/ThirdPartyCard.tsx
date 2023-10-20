import {
  Button, Card, CardActions, CardContent, Link, Typography,
} from '@mui/material';

interface ThirdPartyCardProps {
  email?: string;
  license: string;
  licenseText? :string;
  name: string;
  publisher?: string;
  source?: string;
}
export default function ThirdPartyCard({
  email = undefined,
  license,
  licenseText = undefined,
  name,
  publisher = undefined,
  source = undefined,
}: ThirdPartyCardProps) {
  let text = '';
  if (licenseText) { text = licenseText; } else if (license) { text = `This library is published under the ${license} License.`; }

  return (
    <Card>
      <CardContent>
        <Typography variant="body1" color="text.secondary">{publisher}</Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>{name}</Typography>
        <Typography variant="body1" color="text.secondary">{text}</Typography>
      </CardContent>
      <CardActions>
        {source ? <Button size="small" component={Link} href={source}>Source</Button> : null}
        {email ? <Button size="small" component={Link} href={`mailto:${email}`}>Contact</Button> : null}
      </CardActions>
    </Card>
  );
}
