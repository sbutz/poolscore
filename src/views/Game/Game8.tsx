import {
  Button, Grid, Stack, Typography,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { State, Action } from '../../lib/GameState';
import { PlayerNames } from '../../lib/Game';

const scoreSx = {
  fontSize: '55vh',
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
interface Game8Props {
  names: PlayerNames,
  state: State,
  dispatch: (action: Action) => void,
}
export default function Game8({ names, state, dispatch } : Game8Props) {
  const homePlusOne = () => { dispatch({ type: 'HOME_PLUS_ONE' }); };
  const homeMinusOne = () => { dispatch({ type: 'HOME_MINUS_ONE' }); };
  const guestPlusOne = () => { dispatch({ type: 'GUEST_PLUS_ONE' }); };
  const guestMinusOne = () => { dispatch({ type: 'GUEST_MINUS_ONE' }); };

  return (
    <Stack height="100%" alignItems="center" justifyContent="space-around">
      <Grid container justifyContent="space-evenly" mt="1em">
        <Grid item xs={5} textAlign="center">
          <Typography variant="h1">{names.home}</Typography>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={5} textAlign="center">
          <Typography variant="h1">{names.guest}</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={5} textAlign="center" onClick={homePlusOne}>
          <Typography variant="h1" sx={scoreSx}>
            {state.home.score}
          </Typography>
        </Grid>
        <Grid item xs={2} textAlign="center">
          <Typography variant="h1" sx={scoreSx}>:</Typography>
        </Grid>
        <Grid item xs={5} textAlign="center" onClick={guestPlusOne}>
          <Typography variant="h1" sx={scoreSx}>
            {state.guest.score}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
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
  );
}
