import { AppBar, Toolbar, Stack } from '@mui/material';

interface HeaderProps {
  children: React.ReactNode;
}

export default function GameFooter({ children }: HeaderProps) {
  return (
    <AppBar color="transparent" position="sticky">
      <Toolbar>
        <Stack direction="row" justifyContent="center" width="100%" spacing={3}>
          {children}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
