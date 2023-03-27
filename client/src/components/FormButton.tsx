import { ReactNode } from 'react';
import { Box, Button } from '@mui/material';

interface FormButtonProps {
  onClick: () => void;
  children: ReactNode;
  disabled: boolean;
}

export default function FormButton({ onClick, children, disabled }: FormButtonProps) {
  return (
    <Box sx={{ pt: 1, px: 1, width: '100%' }}>
      <Button
        sx={{ paddingY: '0.8rem' }}
        disabled={disabled}
        variant="contained"
        fullWidth
        onClick={onClick}
      >
        {children}
      </Button>
    </Box>
  );
}
