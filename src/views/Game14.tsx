import { useReducer, useState } from 'react';
import {
  Button, Grid, Stack, Typography, useTheme,
} from '@mui/material';
import {
  ChevronLeft, ChevronRight, PowerSettingsNew, Undo,
} from '@mui/icons-material';

import {
  reducer, initialState, BALLS, PlayerState, isBreakFoulPossible, isFoulPossible,
} from '../store/GameState14';
import Layout from '../components/Layout';
import useCallbackPrompt from '../util/useCallbackPrompt';
import AlertDialog from '../components/AlertDialog';
import BorderBox from '../components/BorderBox';
import Balls from '../assets/Balls';

interface PlayersProps {
  activePlayer: 'home' | 'guest' | undefined;
}
function Players({ activePlayer }: PlayersProps) {
  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={5}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <ChevronRight
            sx={{
              marginLeft: `-${theme.typography.h1.fontSize}`,
              opacity: activePlayer === 'home' ? 1 : 0.1,
              color: activePlayer === 'home' ? 'error.main' : null,
              fontSize: theme.typography.h1.fontSize,
            }}
          />
          <Typography variant="h1">Heim</Typography>
        </Stack>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={5} textAlign="center">
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography variant="h1">Gast</Typography>
          <ChevronLeft
            sx={{
              marginRight: `-${theme.typography.h1.fontSize}`,
              opacity: activePlayer === 'guest' ? 1 : 0.1,
              color: activePlayer === 'guest' ? 'error.main' : null,
              fontSize: theme.typography.h1.fontSize,
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}

const scoreSx = {
  fontSize: '40vh',
  fontWeight: 400,
  lineHeight: 0.75,
  userSelect: 'none',
};
interface ScoreProps {
  home: number;
  guest: number;
}
function Score({ home, guest }: ScoreProps) {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={5} textAlign="center">
        <Typography sx={scoreSx}>
          {home}
        </Typography>
      </Grid>
      <Grid item xs={2} textAlign="center">
        <Typography sx={scoreSx}>
          :
        </Typography>
      </Grid>
      <Grid item xs={5} textAlign="center">
        <Typography sx={scoreSx}>
          {guest}
        </Typography>
      </Grid>
    </Grid>
  );
}

interface EndRunButtonProps {
  disabled: boolean;
  onClick: () => void;
}
function EndRunButton({ disabled, onClick }: EndRunButtonProps) {
  const theme = useTheme();

  return (
    <Button
      color="success"
      disabled={disabled}
      sx={{ fontSize: theme.typography.h6.fontSize }}
      variant="contained"
      onClick={onClick}
    >
      Aufnahme
      <br />
      beenden
    </Button>
  );
}

interface FoulButtonProps {
  disabled: boolean;
  onClick: () => void;
}
function FoulButton({ disabled, onClick }: FoulButtonProps) {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      color="error"
      sx={{ fontSize: theme.typography.h6.fontSize }}
      onClick={onClick}
      disabled={disabled}
    >
      Foul
    </Button>
  );
}
function BreakFoulButton({ disabled, onClick }: FoulButtonProps) {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      color="error"
      sx={{ fontSize: theme.typography.h6.fontSize }}
      onClick={onClick}
      disabled={disabled}
    >
      Break
      <br />
      Foul
    </Button>
  );
}

interface PlayerStatisticsProps {
  state: PlayerState;
}
function PlayerStatistics({ state }: PlayerStatisticsProps) {
  const theme = useTheme();
  const color = {
    0: undefined,
    1: theme.palette.warning.main,
    2: theme.palette.error.main,
  }[state.fouls];
  return (
    <BorderBox label="Statistik">
      <Stack direction="row" justifyContent="center" gap={2}>
        <Stack direction="column" justifyContent="center">
          <table>
            <tbody>
              <tr>
                <td><Typography variant="h6">AN:</Typography></td>
                <td><Typography variant="h6">{state.runs.length}</Typography></td>
              </tr>
              <tr>
                <td><Typography variant="h6">HS:</Typography></td>
                <td><Typography variant="h6">{state.highestScore}</Typography></td>
              </tr>
            </tbody>
          </table>
        </Stack>
        <Stack direction="column" justifyContent="center">
          <table>
            <tbody>
              <tr>
                <td><Typography variant="h6">GD:</Typography></td>
                <td><Typography variant="h6">{state.averageScore.toFixed(2)}</Typography></td>
              </tr>
              <tr>
                <td><Typography variant="h6" sx={{ color }}>Fouls:</Typography></td>
                <td><Typography variant="h6" sx={{ color }}>{state.fouls}</Typography></td>
              </tr>
            </tbody>
          </table>
        </Stack>
      </Stack>
    </BorderBox>
  );
}

export default function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showReset, setShowReset] = useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(true);

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

  const startingPlayerSelect = (
    <Grid container>
      <Grid item xs={5} textAlign="center">
        <Button
          variant="contained"
          color="success"
          sx={{ fontSize: '3rem' }}
          onClick={() => {
            dispatch?.({
              type: 'SET_ACTIVE_PLAYER',
              player: 'home',
            });
          }}
        >
          Heim beginnt
        </Button>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={5} textAlign="center">
        <Button
          variant="contained"
          color="success"
          sx={{ fontSize: '3rem' }}
          onClick={() => {
            dispatch?.({
              type: 'SET_ACTIVE_PLAYER',
              player: 'guest',
            });
          }}
        >
          Gast beginnt
        </Button>
      </Grid>
    </Grid>
  );

  const buttons = (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={5}>
          <Stack direction="row" justifyContent="center" gap={2}>
            <BreakFoulButton
              onClick={() => {
                dispatch?.({ type: 'BREAK_FOUL' });
              }}
              disabled={state.activePlayer !== 'home' || !isBreakFoulPossible(state)}
            />
            <FoulButton
              onClick={() => {
                dispatch?.({ type: 'FOUL' });
              }}
              disabled={state.activePlayer !== 'home' || !isFoulPossible(state)}
            />
            <PlayerStatistics state={state.home} />
            <EndRunButton
              disabled={state.activePlayer !== 'home'}
              onClick={() => {
                dispatch?.({
                  type: 'SET_ACTIVE_PLAYER',
                  player: 'guest',
                });
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={5}>
          <Stack direction="row" justifyContent="center" gap={2}>
            <EndRunButton
              disabled={state.activePlayer !== 'guest'}
              onClick={() => {
                dispatch?.({
                  type: 'SET_ACTIVE_PLAYER',
                  player: 'home',
                });
              }}
            />
            <PlayerStatistics state={state.guest} />
            <FoulButton
              onClick={() => {
                dispatch?.({ type: 'FOUL' });
              }}
              disabled={state.activePlayer !== 'guest' || !isFoulPossible(state)}
            />
            <BreakFoulButton
              onClick={() => {
                dispatch?.({ type: 'BREAK_FOUL' });
              }}
              disabled={state.activePlayer !== 'guest' || !isBreakFoulPossible(state)}
            />
          </Stack>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <BorderBox label="Anzahl verbleibender Kugeln">
          {BALLS.map((i) => {
            const enabled = i <= state.remainingBalls;
            const Image = Balls[i - 1];
            return (
              <div
                key={i}
                style={{
                  display: 'inline-block',
                  marginRight: 6,
                  marginLeft: 6,
                  filter: enabled ? 'none' : 'grayscale(100%)',
                  opacity: enabled ? '100%' : '10%',
                  width: '5rem',
                }}
              >
                <Image
                  onClick={() => {
                    if (enabled) {
                      dispatch?.({
                        type: 'SET_REMAINING_BALLS',
                        balls: i,
                      });
                    }
                  }}
                />
              </div>
            );
          })}
        </BorderBox>
      </Grid>
    </>
  );

  return (
    <Layout title="14/1 endlos" fullwidth toolbar={toolbar}>
      <Stack height="100%" justifyContent="space-around">
        <Players activePlayer={state.activePlayer} />
        <Score
          home={state.home.score}
          guest={state.guest.score}
        />
        {state.activePlayer === undefined ? startingPlayerSelect : buttons}
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
