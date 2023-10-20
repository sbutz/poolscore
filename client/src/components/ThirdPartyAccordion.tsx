import {
  Accordion, AccordionDetails, AccordionSummary, Link, Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

interface ThirdPartyAccordionProps {
  email?: string;
  license: string;
  licenseText? :string;
  name: string;
  publisher?: string;
  source?: string;
}
export default function ThirdPartyAccordion({
  email = undefined,
  license,
  licenseText = undefined,
  name,
  publisher = undefined,
  source = undefined,
}: ThirdPartyAccordionProps) {
  let text = '';
  if (licenseText) { text = licenseText; } else if (license) { text = `This library is published under the ${license} License.`; }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1">
          Publisher:
          {' '}
          {publisher}
        </Typography>
        {email
          ? (
            <Typography variant="body1">
              Contact:
              {' '}
              <Link href={`mailto:${email}`}>{email}</Link>
            </Typography>
          )
          : null}
        {source ? (
          <Typography variant="body1">
            Source:
            {' '}
            <Link href={source}>{source}</Link>
          </Typography>
        ) : null}
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5 }}>{text}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
