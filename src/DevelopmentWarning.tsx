import { useState } from 'react';
import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function DevelopmentWarning() {
  const [dismissed, setDismissed] = useState(false);

  if (process.env.REACT_APP_ENV === 'production' || dismissed) {
    return null;
  }

  return (
    <Alert
      severity="warning"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1300,
        borderRadius: 0,
        backgroundColor: '#FFD700',
        color: '#000',
        '& .MuiAlert-message': {
          width: '100%',
          textAlign: 'center',
          fontWeight: 'bold',
        },
        '& .MuiAlert-icon': {
          color: '#000',
        },
      }}
      action={(
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => setDismissed(true)}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      )}
    >
      This is a TEST ENVIRONMENT. Data will be deleted periodically.
    </Alert>
  );
}
