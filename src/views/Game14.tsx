import { useReducer, useState } from 'react';
import { Button, Grid, Stack, Typography, } from '@mui/material'
import { PowerSettingsNew, Undo, } from '@mui/icons-material';

import { reducer, initialState } from '../store/GameState14';
import Layout from '../components/Layout';
import { useCallbackPrompt } from '../util/useCallbackPrompt';
import AlertDialog from '../components/AlertDialog';

function range(start : number, end : number) {
    const a = []
    for (; start < end; start++)
        a.push(start);
    return a;
}

const scoreSx = {
    fontSize: "40vh",
    fontWeight: 400,
    lineHeight: 0.6,
    userSelect: "none",
};

const activeSx = {
    color: 'warning.main',
}

function Game() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [showReset, setShowReset] = useState(false);
    const [showPrompt, confirmNavigation, cancelNavigation] =
      useCallbackPrompt(true);

    const toolbar = <>
        <Button
            color="inherit"
            startIcon={<Undo/>}
            onClick={() => { dispatch?.({type: 'ROLLBACK'}); }}
        >
            Rückgängig
        </Button>
        <Button
            color="inherit"
            startIcon={<PowerSettingsNew/>}
            onClick={() => { setShowReset(true); }}
        >
            Neues Spiel
        </Button>
    </>;

    const startingPlayerSelect = (
        <Grid container justifyContent="center">
            <Grid item xs={5} textAlign="center">
                <Button
                    variant="contained"
                    sx={{ fontSize: "3rem" }}
                    onClick={() => {
                        dispatch?.({
                            type: 'SET_STARTING_PLAYER',
                            player: 'home',
                        });
                    }}
                >
                    Heim beginnt
                </Button>
            </Grid>
            <Grid item xs={2} textAlign="center">
            </Grid>
            <Grid item xs={5} textAlign="center">
                <Button
                    variant="contained"
                    sx={{ fontSize: "3rem" }}
                    onClick={() => {
                        dispatch?.({
                            type: 'SET_STARTING_PLAYER',
                            player: 'guest',
                        });
                    }}
                >
                    Gast beginnt
                </Button>
            </Grid>
        </Grid>
    );

    const score = (
        <Grid container justifyContent="center">
            <Grid item xs={5} textAlign="center">
                <Typography
                    variant="h1"
                    sx={state.activePlayer === 'home' ?
                        {...scoreSx, ...activeSx} : scoreSx}
                >
                    {state.scoreHome}
                </Typography>
            </Grid>
            <Grid item xs={2} textAlign="center">
                <Typography variant="h1" sx={scoreSx}>:</Typography>
            </Grid>
            <Grid item xs={5} textAlign="center">
                <Typography
                    variant="h1"
                    sx={state.activePlayer === 'guest' ?
                        {...scoreSx, ...activeSx} : scoreSx}
                >
                    {state.scoreGuest}
                </Typography>
            </Grid>
        </Grid>
    );
    const buttons = <>
        <Grid container justifyContent="center">
            <Grid item xs={5} textAlign="center">
                <Stack direction="row" spacing={2} justifyContent="center" pb={2}>
                    <Typography variant="h5">
                        Aufnahme: {state.runsHome.length}
                    </Typography>
                    <Typography variant="h5" sx={{
                        color: state.foulsHome === 1 ?
                            'warning.main' : (state.foulsHome > 1 ? 'error.main' : 'inherit')
                    }}>
                        Fouls: {state.foulsHome}
                    </Typography>
                </Stack>
                <Button
                    variant="contained"
                    sx={{ fontSize: "2rem" }}
                    onClick={() => {
                        dispatch?.({
                            type: 'FOUL',
                            player: 'home',
                        });
                    }}
                    disabled={state.runsHome.at(-1) && state.runsHome.at(-1)!.fouls === 1}
                >
                    Foul
                </Button>
            </Grid>
            <Grid item xs={2} textAlign="center">
            </Grid>
            <Grid item xs={5} textAlign="center">
                <Stack direction="row" spacing={2} justifyContent="center" pb={2}>
                    <Typography variant="h5">
                        Aufnahme: {state.runsGuest.length}
                    </Typography>
                    <Typography variant="h5" sx={{
                        color: state.foulsGuest === 1 ?
                            'warning.main' : (state.foulsGuest > 1 ? 'error.main' : 'inherit')
                    }}>
                        Fouls: {state.foulsGuest}
                    </Typography>
                </Stack>
                <Button
                    variant="contained"
                    sx={{ fontSize: "2rem" }}
                    onClick={() => {
                        dispatch?.({
                            type: 'FOUL',
                            player: 'guest',
                        });
                    }}
                    disabled={state.runsGuest.at(-1) && state.runsGuest.at(-1)!.fouls === 1}
                >
                    Foul
                </Button>
            </Grid>
        </Grid>
        <Grid container justifyContent="center">
            <Grid item textAlign="center" width="100%">
                <Typography variant="h3" sx={{ mb: 4 }}>
                    Restliche Kugeln:
                </Typography>
                <img
                    src={`${process.env.PUBLIC_URL}/14+.svg`}
                    alt={"+14"}
                    style={{
                        width: "6%",
                    }}
                    onClick={() => {
                        dispatch?.({
                            type: 'SET_REMAINING_BALLS',
                            balls: 1,
                        });
                    }}
                />
                {range(2, 16).map(i =>  {
                    const enabled = i <= state.remainingBalls;
                    return (
                        <img
                            key={i}
                            src={`${process.env.PUBLIC_URL}/${i}B.svg`}
                            alt={i.toString()}
                            style={{
                                width: "6%",
                                filter: enabled ?  "none" : "grayscale(100%)",
                                opacity: enabled ? "100%" : "10%",
                            }}
                            onClick={() => {
                                if (enabled)
                                    dispatch?.({
                                        type: 'SET_REMAINING_BALLS',
                                        balls: i,
                                    });
                            }}
                        />
                    );
                })}
            </Grid>
        </Grid>
    </>;

    return (
    <Layout title="14/1 endlos" fullwidth toolbar={toolbar}>
        <Stack height="100%" alignItems="center" justifyContent="space-around">
            <Grid container justifyContent="space-evenly" mt="1em">
                <Grid item xs={5} textAlign="center">
                    <Typography
                        variant="h1"
                        sx={state.activePlayer === 'home' ? activeSx : null}
                    >
                        Heim
                    </Typography>
                </Grid>
                <Grid item xs={2} textAlign="center">
                    <Typography variant="h1">vs</Typography>
                </Grid>
                <Grid item xs={5} textAlign="center">
                    <Typography
                        variant="h1"
                        sx={state.activePlayer === 'guest' ? activeSx : null}
                    >
                        Gast
                    </Typography>
                </Grid>
            </Grid>
            {state.activePlayer === undefined ?
                startingPlayerSelect : <>{score}{buttons}</>}
            {/*
            - foul anzeige
            - aufnhame anzeige
            */}
        </Stack>
        <AlertDialog
            open={showPrompt as boolean || showReset}
            title={showPrompt ? "Zurück zur Startseite?" : "Neues Spiel starten"}
            text={"Der aktuelle Spielstand geht dabei verloren."}
            cancelText={"Abbrechen"}
            onCancel={()=> {
                if (showPrompt)
                    (cancelNavigation as (() => void))();
                else
                    setShowReset(false);
            }}
            acceptText={"Ok"}
            onAccept={() => {
                dispatch?.({type: 'RESET'});
                if (showPrompt)
                    (confirmNavigation as (() => void))();
                else
                    setShowReset(false);
            }}
        />
    </Layout>
    );
}

export default Game;