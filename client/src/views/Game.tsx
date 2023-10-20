import { useReducer, useState } from 'react';
import {
  Button, Grid, Stack, Typography,
} from '@mui/material';
import {
  Add, PowerSettingsNew, Remove, Undo,
} from '@mui/icons-material';

import { reducer, initialState } from '../store/GameState';
import Layout from '../components/Layout';
import useCallbackPrompt from '../util/useCallbackPrompt';
import AlertDialog from '../components/AlertDialog';

const scoreSx = {
  fontSize: '60vh',
  fontWeight: 400,
  lineHeight: 0.6,
  userSelect: 'none',
};

interface ButtonProps {
  onClick: () => void;
}
function AddButton({ onClick }: ButtonProps) {
  return (
    <Button variant="contained" color="success" sx={{ mx: 3 }} onClick={onClick}>
      <Add sx={{ fontSize: '5rem' }} />
    </Button>
  );
}
function RemoveButton({ onClick }: ButtonProps) {
  return (
    <Button variant="contained" color="error" sx={{ mx: 3 }} onClick={onClick}>
      <Remove sx={{ fontSize: '5rem' }} />
    </Button>
  );
}

function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showReset, setShowReset] = useState(false);
  const isBlocked = state.actions.length !== 0;
  const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(isBlocked);

  const homePlusOne = () => { dispatch?.({ type: 'HOME_PLUS_ONE' }); };
  const homeMinusOne = () => { dispatch?.({ type: 'HOME_MINUS_ONE' }); };
  const guestPlusOne = () => { dispatch?.({ type: 'GUEST_PLUS_ONE' }); };
  const guestMinusOne = () => { dispatch?.({ type: 'GUEST_MINUS_ONE' }); };

  const toolbar = (
    <>
      <Button
        color="inherit"
        startIcon={<Undo />}
        onClick={() => { dispatch?.({ type: 'ROLLBACK' }); }}
      >
        Rückgängig
      </Button>
      <Button
        color="inherit"
        startIcon={<PowerSettingsNew />}
        onClick={() => { setShowReset(true); }}
      >
        Neues Spiel
      </Button>
    </>
  );

  return (
    <Layout requireDesktop title="8/9/10-Ball" fullwidth toolbar={toolbar}>
      <Stack height="100%" alignItems="center" justifyContent="space-around">
        <Grid container justifyContent="space-evenly" mt="1em">
          <Grid item xs={5} textAlign="center">
            <Typography variant="h1">Heim</Typography>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={5} textAlign="center">
            <Typography variant="h1">Gast</Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={5} textAlign="center" onClick={homePlusOne}>
            <Typography variant="h1" sx={scoreSx}>
              {state.scoreHome}
            </Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography variant="h1" sx={scoreSx}>:</Typography>
          </Grid>
          <Grid item xs={5} textAlign="center" onClick={guestPlusOne}>
            <Typography variant="h1" sx={scoreSx}>
              {state.scoreGuest}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" mb="2em">
          <Grid item xs={5} textAlign="center">
            <AddButton onClick={homePlusOne} />
            <RemoveButton onClick={homeMinusOne} />
          </Grid>
          <Grid item xs={2} textAlign="center" />
          <Grid item xs={5} textAlign="center">
            <AddButton onClick={guestPlusOne} />
            <RemoveButton onClick={guestMinusOne} />
          </Grid>
        </Grid>
      </Stack>
      <AlertDialog
        open={showPrompt as boolean || showReset}
        title={showPrompt ? 'Zurück zur Startseite?' : 'Neues Spiel starten'}
        text="Der aktuelle Spielstand geht dabei verloren."
        cancelText="Abbrechen"
        onCancel={() => {
          if (showPrompt) (cancelNavigation as (() => void))();
          else setShowReset(false);
        }}
        acceptText="Ok"
        onAccept={() => {
          dispatch?.({ type: 'RESET' });
          if (showPrompt) (confirmNavigation as (() => void))();
          else setShowReset(false);
        }}
      />
    </Layout>
  );
}

export default Game;
